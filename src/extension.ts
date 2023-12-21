import * as vscode from "vscode";
import * as path from "path";
import { Uri, WorkspaceFolder } from "vscode";
import * as Mustache from "mustache";

let newFileToHasOpened = new Map();

interface LabelStringPair {
  label: string;
  content: string;
}

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
  const pickedTemplate = await vscode.window.showQuickPick(templateLabels);

  if (pickedTemplate) {
    const template = templates.find((t) => t.label === pickedTemplate);
    if (template) {
      insertTemplateContent(template.content);
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
  const templatesFilePath = path.join(
    workspaceFolders[0].uri.fsPath,
    vscode.workspace
      .getConfiguration()
      .get<string>("smartTemplates.jsonConfigurationFile") || ""
  );
  try {
    const templatesFileUri = Uri.file(templatesFilePath);
    const fileContent = await vscode.workspace.fs.readFile(templatesFileUri);
    const templatesJson = Buffer.from(fileContent).toString("utf-8");
    const templatesConfig = JSON.parse(templatesJson) as Record<
      string,
      { label: string; template_path: string }
    >;
    return await transformTemplatesConfig(
      templatesConfig,
      workspaceFolders[0],
      newFileUri
    );
  } catch (_) {
    return [];
  }
}

async function transformTemplatesConfig(
  config: Record<string, { label: string; template_path: string }>,
  workspaceFolder: WorkspaceFolder,
  newFileUri: vscode.Uri
): Promise<LabelStringPair[]> {
  let templates: LabelStringPair[] = [];
  for (const pattern in config) {
    if (!new RegExp(pattern).test(getRelativeFilePath(newFileUri))) {
      continue;
    }
    const details = config[pattern];
    const templateFilePath = path.join(
      workspaceFolder.uri.fsPath,
      details.template_path
    );
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
  return templates;
}

function getMustacheData(uri: vscode.Uri): Record<string, any> {
  return {
    file_path: getRelativeFilePath(uri),
    date: new Date().toLocaleDateString(),
    file_name_snake_case: toSnakeCase(uri),
    file_name_pascal_case: toPascalCase(uri),
    file_name_camel_case: toCamelCase(uri),
    ...vscode.workspace.getConfiguration().get("smartTemplates.customData", {}),
  };
}

function toPascalCase(uri: vscode.Uri): string {
  const fileName = uri.path.split("/").pop(); // Get the file name with extension
  if (!fileName) {
    return "";
  }

  const withoutExtension = fileName.split(".")[0]; // Remove the extension
  // Convert snake_case or kebab-case to UpperCamelCase, including numbers
  let pascalCase = withoutExtension.replace(/([-_]\w)/g, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });

  return pascalCase.charAt(0).toUpperCase() + pascalCase.slice(1);
}

function toCamelCase(uri: vscode.Uri): string {
  const fileName = uri.path.split("/").pop(); // Get the file name with extension
  if (!fileName) {
    return "";
  }

  const withoutExtension = fileName.split(".")[0]; // Remove the extension
  // Convert snake_case or kebab-case to camelCase, including numbers
  let camelCase = withoutExtension.replace(/([-_]\w)/g, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });

  return camelCase.charAt(0).toLowerCase() + camelCase.slice(1);
}

function toSnakeCase(uri: vscode.Uri): string {
  const fileName = uri.path.split("/").pop(); // Get the file name with extension
  if (!fileName) {
    return "";
  }

  const withoutExtension = fileName.split(".")[0]; // Remove the extension
  // Convert camelCase or PascalCase to snake_case
  const snakeCase = withoutExtension.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`
  );

  return snakeCase.startsWith("_") ? snakeCase.slice(1) : snakeCase; // Remove leading underscore if any
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

export function deactivate() {}
