# Smart File Templates for VSCode

## Overview

Smart File Templates for VSCode is an extension that helps you work faster by letting you create your own file templates. You decide the rules (using regex patterns) for when each template should be suggested. So, when you make a new file, the extension suggests the right template based on your rules. Plus, you can use dynamic variables within these templates for even more power and flexibility.

![output-7](https://github.com/tnesbitt210/smart-file-templates/assets/10647853/4912072f-82e8-4449-b8de-0cf605aa6a33)

Below, you will find the templates & regex rules used to make this demo.

## Getting started

1.  Install [Smart File Templates](https://marketplace.visualstudio.com/items?itemName=TrevorNesbitt.smart-file-templates) from the Visual Studio Code Marketplace to integrate it into your VSCode setup.
    <br>

2.  **Create .fileTemplates.json**: Use this file to set up rules that determine which templates are suggested for newly created files in your project. Define each rule using a regex pattern as the key, and assign a corresponding list of objects `{"label": string, "template_path": string}` as its value. The 'label' is a descriptive name for the template, and 'template_path' is the relative path to the template file itself.

    <br>
    The following JSON was used in the above demo:

    > ```js
    > // .fileTemplates.json
    > ```
    >
    > ```json
    > {
    >   ".*\\.tsx": [
    >     {
    >       "label": "React Component",
    >       "template_path": ".templates/react_component.template"
    >     }
    >   ],
    >   ".*\\.test\\.ts": [
    >     {
    >       "label": "Jest Test",
    >       "template_path": ".templates/jest_test.template"
    >     }
    >   ]
    > }
    > ```

    <br>

    > **NOTE:** You can use a file other than `.fileTemplates.json` by editing the `smartTemplates.jsonConfigurationFile` setting in VSCode.

    > **NOTE:** All paths are relative to the workspace root.

    <br>

3.  **Create your template files**: Create the template files corresponding to each `template_path` in your `.fileTemplates.json` file. You may use {{mustache_syntax}} to insert variables into your templates. An exhaustive list of the available variables can be found in the [Available Variables](#available-variables) section below.

    <br>
    The folowing template was used in the above demo:

    > ```js
    > // .templates/react_component.template
    >
    > import React from 'react';
    >
    > interface {{file_name_pascal_case}}Props {
    >    // Define your component props here
    > }
    >
    > const {{file_name_pascal_case}}: React.FC<{{file_name_pascal_case}}Props> = (props) => {
    >    return (
    >        <div>
    >
    >        </div>
    >    );
    > };
    >
    > export default {{file_name_pascal_case}};
    > ```

## Available variables

| Variable                      | Description                                                                                                                                                            | Default / Example Value                       |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `{{oncall}}`                  | Set via the `smartTemplates.oncall` VSCode setting                                                                                                                     | Default: `__ONCALL__`                         |
| `{{owner}}`                   | Set via the `smartTemplates.owner` VSCode setting                                                                                                                      | Default: `__OWNER__`                          |
| `{{maintainers}}`             | Set via the `smartTemplates.maintainers` VSCode setting                                                                                                                | Default: `__MAINTAINERS__`                    |
| `{{author}}`                  | Set via the `smartTemplates.author` VSCode setting                                                                                                                     | Default: `__AUTHOR__`                         |
| `{{file_path}}`               | Inserts the relative path of the file from the root of your workspace.                                                                                                 | N/A                                           |
| `{{file_directory}}`          | Inserts the relative directory of the current file. If the file is at the root, this will be an empty string.                                                          | Example: `path/to/my` for path/to/my/file.txt |
| `{{parent_directory}}`        | Inserts the relative directory one level above the current file's directory. If the file is at the root or there is no parent directory, this will be an empty string. | Example: `path/to` for path/to/my/file.txt    |
| `{{date}}`                    | Adds the current date in a localized date string format.                                                                                                               | Example: 2023-12-21                           |
| `{{file_name_snake_case}}`    | Provides the file name in snake_case format.                                                                                                                           | Example: `my_new_file`                        |
| `{{file_name_pascal_case}}`   | Converts the file name to PascalCase format, useful for classes and components.                                                                                        | Example: `MyNewFile`                          |
| `{{file_name_camel_case}}`    | Transforms the file name into camelCase format, typically used for variables and functions.                                                                            | Example: `myNewFile`                          |
| `{{file_name_kebab_case}}`    | Converts the file name to kebab-case format, often used in URLs and file names.                                                                                        | Example: `my-new-file`                        |
| `{{file_name_constant_case}}` | Transforms the file name into CONSTANT_CASE format, commonly used for constants.                                                                                       | Example: `MY_NEW_FILE`                        |
| `{{file_name_dot_case}}`      | Provides the file name in dot.case format, used in domains and namespaces.                                                                                             | Example: `my.new.file`                        |
| `{{file_name_path_case}}`     | Converts the file name to path/case format, resembling file paths.                                                                                                     | Example: `my/new/file`                        |
| `{{file_name_sentence_case}}` | Transforms the file name into Sentence case, with only the first letter of the first word capitalized.                                                                 | Example: `My new file`                        |
| `{{file_name_lower_case}}`    | Transforms the file name into lower case, typically used for documentation or descriptions.                                                                            | Example: `my new file`                        |
| `{{file_name_title_case}}`    | Transforms the file name into Title Case format, where the first letter of each word is capitalized.                                                                   | Example: `My New File`                        |

> **NOTE:** You can add additional variables via the VSCode setting `smartTemplates.customData`.

## Support and Contributions

For support or to contribute to Smart File Templates, please visit our [GitHub repository](https://github.com/tnesbitt210/smart-file-templates).

## License

Smart File Templates is available under the MIT License. Refer to the LICENSE file for detailed information.
