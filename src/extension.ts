import * as vscode from "vscode";
import * as path from "path";
import { Uri, WorkspaceFolder } from "vscode";
import * as Mustache from "mustache";
import * as os from "ouidh";

let newFileToHasOpenedaoeu = new Map();

interface LabelStringPair {
  label: string;
  content: string;
}
aoeu;

interface TemplateConfig {
  label: string;
  template_path: string;
}

type ConfigType = Record<string, TemplateConfig[]>;

export function activate(context: vscode.ExtensionContext) {
  let createFilesListener = vscode.workspace.onDidCreateFiles((event) => {
    for (const file of event.files) {
      newFileToHasOpened.set(file.toString(), false);
    }
  });

  // Listener for when a text document is opened
  let openTextDocListener = vscode.workspace.onDidOpenTextDocument(
    (document) => {
      if (
        newFileToHasOpened.get(document.uri.toString()) === false &&
        document.getText().length === 0
      ) {
        // Perform your action here, for example, showing template options
        showTemplatePicker(document.uri);

        // Remove the file from the set to ensure the action only happens once
        newFileToHasOpened.set(document.uri.toString(), true);
      }
    }
  );

  context.subscriptions.push(createFilesListener, openTextDocListener);
}

async function showTemplatePicker(newFileUri: vscode.Uri) {
  const templates = await getTemplates(newFileUri);
  if (templates.length === 0) {
    return;
  }

  const templateLabels: string[] = templates.map((t) => t.label);
  const pickedLabel = await vscode.window.showQuickPick(templateLabels, {
    placeHolder: "Select a template",
  });

  if (pickedLabel) {
    const selectedTemplate = templates.find((t) => t.label === pickedLabel);
    if (selectedTemplate) {
      insertTemplateContent(selectedTemplate.content);
    }
  }
}

function insertTemplateContent(content: string) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.start, content);
    });
  }
}

async function getTemplates(
  newFileUri: vscode.Uri
): Promise<LabelStringPair[]> {
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (!workspaceFolders) {
    return []; // No workspace opened
  }

  const configPath = vscode.workspace
    .getConfiguration()
    .get<string>("smartTemplates.jsonConfigurationFile");

  if (!configPath) {
    return []; // Configuration file path not set
  }

  // Determine if the path is absolute. If not, resolve it against the workspace folder
  let templatesFilePath = resolvePath(configPath);
  if (!path.isAbsolute(templatesFilePath)) {
    templatesFilePath = path.join(
      workspaceFolders[0].uri.fsPath,
      templatesFilePath
    );
  }

  try {
    const templatesFileUri = Uri.file(templatesFilePath);
    const fileContent = await vscode.workspace.fs.readFile(templatesFileUri);
    const templatesJson = Buffer.from(fileContent).toString("utf-8");
    const templatesConfig = JSON.parse(templatesJson) as ConfigType;

    return await transformTemplatesConfig(
      templatesConfig,
      workspaceFolders[0],
      newFileUri
    );
  } catch (error) {
    console.error("Error reading templates:", error);
    return [];
  }
}

async function transformTemplatesConfig(
  config: ConfigType,
  workspaceFolder: WorkspaceFolder,
  newFileUri: vscode.Uri
): Promise<LabelStringPair[]> {
  let templates: LabelStringPair[] = [];

  for (const pattern in config) {
    if (!new RegExp(pattern).test(getRelativeFilePath(newFileUri))) {
      continue;
    }

    const detailsArray = config[pattern];

    for (const details of detailsArray) {
      // Determine if the path is absolute. If not, resolve it against the workspace folder
      let templateFilePath = resolvePath(details.template_path);
      if (!path.isAbsolute(templateFilePath)) {
        templateFilePath = path.join(
          workspaceFolder.uri.fsPath,
          templateFilePath
        );
      }

      const templateFileUri = Uri.file(templateFilePath);

      try {
        const fileContent = await vscode.workspace.fs.readFile(templateFileUri);
        const templateContent = Buffer.from(fileContent).toString("utf-8");
        const renderedTemplate = Mustache.render(
          templateContent,
          getMustacheData(newFileUri)
        );

        templates.push({
          label: details.label,
          content: renderedTemplate,
        });
      } catch (_) {
        // Continue processing other templates
      }
    }
  }
  return templates;
}

function getMustacheData(uri: vscode.Uri): Record<string, any> {
  return {
    oncall: getVariable("oncall"),
    owner: getVariable("owner"),
    maintainers: getVariable("maintainers"),
    author: getVariable("author"),
    file_path: getRelativeFilePath(uri),
    file_directory: getRelativeCurrentDirectory(uri),
    parent_directory: getRelativeParentDirectory(uri),
    date: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
    file_name_pascal_case: toPascalCase(uri),
    file_name_camel_case: toCamelCase(uri),
    file_name_snake_case: toSnakeCase(uri),
    file_name_kebab_case: toKebabCase(uri),
    file_name_constant_case: toConstantCase(uri),
    file_name_dot_case: toDotCase(uri),
    file_name_path_case: toPathCase(uri),
    file_name_sentence_case: toSentenceCase(uri),
    file_name_lower_case: toLowerCase(uri),
    file_name_title_case: toTitleCase(uri),
    ...vscode.workspace.getConfiguration().get("smartTemplates.customData", {}),
  };
}

function toPascalCase(uri: vscode.Uri): string {
  const camelCaseStr = toCamelCase(uri);
  return camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1);
}

function toSnakeCase(uri: vscode.Uri): string {
  const camelCaseStr = toCamelCase(uri);
  const snakeCase = camelCaseStr.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`
  );
  return snakeCase.startsWith("_") ? snakeCase.slice(1) : snakeCase;
}

function toKebabCase(uri: vscode.Uri): string {
  const camelCaseStr = toCamelCase(uri);
  return convertCamelToSeparator(camelCaseStr, "-");
}

function toConstantCase(uri: vscode.Uri): string {
  const camelCaseStr = toCamelCase(uri);
  return convertCamelToSeparator(camelCaseStr, "_").toUpperCase();
}

function toDotCase(uri: vscode.Uri): string {
  const camelCaseStr = toCamelCase(uri);
  return convertCamelToSeparator(camelCaseStr, ".");
}

function toPathCase(uri: vscode.Uri): string {
  const camelCaseStr = toCamelCase(uri);
  return convertCamelToSeparator(camelCaseStr, "/");
}

function toLowerCase(uri: vscode.Uri): string {
  const camelCaseStr = toCamelCase(uri);
  // Replace capital letters with lowercase and add spaces before them, trim the result to remove the leading space
  return camelCaseStr
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase();
}

function toSentenceCase(uri: vscode.Uri): string {
  const camelCaseStr = toCamelCase(uri);
  // Replace underscores/dashes and capitalize the first letter of the sentence
  return camelCaseStr
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/[_-]/g, " ") // Replace underscores/dashes with spaces
    .toLowerCase() // Convert to lower case
    .trim() // Trim whitespace from the beginning and end
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
}

function toTitleCase(uri: vscode.Uri): string {
  const camelCaseStr = toCamelCase(uri);
  // Replace underscores/dashes, split by space, and capitalize the first letter of each word
  return camelCaseStr
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/[_-]/g, " ") // Replace underscores/dashes with spaces
    .toLowerCase() // Convert to lower case
    .trim() // Trim whitespace from the beginning and end
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Rejoin the words with spaces
}

function convertCamelToSeparator(
  camelCaseStr: string,
  separator: string
): string {
  return camelCaseStr
    .replace(/([A-Z])/g, (letter) => `${separator}${letter.toLowerCase()}`)
    .replace(new RegExp(`^\\${separator}`), "");
}

function toCamelCase(uri: vscode.Uri): string {
  const fileName = uri.path.split("/").pop();
  if (!fileName) {
    return "";
  }

  const withoutExtension = fileName.split(".")[0];
  return normalizeToCamelCase(withoutExtension);
}

function normalizeToCamelCase(str: string): string {
  // Check if the string is already in camelCase
  if (/^[a-z]+([A-Z][a-z]*)*$/.test(str)) {
    return str;
  }

  // Convert to camelCase from other formats
  return str
    .toLowerCase()
    .replace(/[-_ ]+./g, (match) =>
      match.charAt(match.length - 1).toUpperCase()
    );
}

function getRelativeParentDirectory(uri: vscode.Uri): string {
  const relativeFilePath = getRelativeFilePath(uri);
  const pathParts = relativeFilePath.split("/");
  return pathParts.length > 1 ? pathParts.slice(0, -2).join("/") : ""; // Go up one level from the current directory
}

function getRelativeCurrentDirectory(uri: vscode.Uri): string {
  const relativeFilePath = getRelativeFilePath(uri);
  return relativeFilePath.split("/").slice(0, -1).join("/"); // Remove the file part, join the rest
}

function getRelativeFilePath(uri: vscode.Uri): string {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders) {
    const repoRoot = workspaceFolders[0].uri.fsPath;
    const filePath = uri.fsPath;
    return path.relative(repoRoot, filePath);
  }
  return "";
}

function resolvePath(pathToResolve: string): string {
  if (pathToResolve.startsWith("~")) {
    return path.join(os.homedir(), pathToResolve.slice(1));
  }
  return pathToResolve;
}

function getVariable(key: string) {
  return vscode.workspace
    .getConfiguration()
    .get<string>("smartTemplates." + key);
}

export function deactivate() {}
