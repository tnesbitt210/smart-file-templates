# Smart File Templates for VSCode

## Overview

Smart File Templates for VSCode is an extension that helps you work faster by letting you create your own file templates. You decide the rules (using regex patterns) for when each template should be suggested. So, when you make a new file, the extension suggests the right template based on your rules. Plus, you can use dynamic variables within these templates for even more power and flexibility.

![output-6a](https://github.com/tnesbitt210/smart-file-templates/assets/10647853/206936e9-5385-40aa-a144-bf9865251099)

You can find the source code for Smart File Templates in the GitHub repository: [Smart File Templates on GitHub](https://github.com/tnesbitt210/smart-file-templates).

## Getting started

Download and install [Smart File Templates](https://marketplace.visualstudio.com/items?itemName=TrevorNesbitt.smart-file-templates) from the Visual Studio Code Marketplace to integrate it into your VSCode setup.
<br>

1.  **Create .fileTemplates.json**: This is the file that is used to match new files to template suggestions via regex patterns. Each key should be a regex pattern, and each value should be a `{"label": string, "template_path": string}`
    The following JSON was used in the above demo:
    <br>

    _.fileTemplates.json_

    > ```json
    > {
    >   ".*\\.tsx": {
    >     "label": "React Component",
    >     "template_path": ".templates/react_component.template"
    >   },
    >   ".*\\.test\\.ts": {
    >     "label": "Jest Test",
    >     "template_path": ".templates/jest_test.template"
    >   }
    > }
    > ```

    <br>

    > **NOTE:** You can use a file other than `.fileTemplates.json` by editing the `smartTemplates.jsonConfigurationFile` setting in VSCode.

    > **NOTE:** All paths are relative to the workspace root.

    <br>

2) **Create your template files**: Create the template files corresponding to each `template_path` listed above. You may use {{mustache_syntax}} to insert variables into your templates. An exhaustive list of the available variables can be found in the [Available Variables](#available-variables) section below.
   The folowing template was the first one used in the above demo:
   <br>

   _.templates/react_component.template_

   > ```js
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

| Variable                    | Description                                                                                 | Example Usage                               |
| --------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `{{file_path}}`             | Inserts the relative path of the file from the root of your workspace.                      | N/A                                         |
| `{{date}}`                  | Adds the current date in a localized date string format.                                    | 2023-12-21                                  |
| `{{file_name_snake_case}}`  | Provides the file name in snake_case format.                                                | `my_new_file` for `path/to/my_new_file.tsx` |
| `{{file_name_pascal_case}}` | Converts the file name to PascalCase format, useful for classes and components.             | `MyNewFile` for `path/to/my_new_file.tsx`   |
| `{{file_name_camel_case}}`  | Transforms the file name into camelCase format, typically used for variables and functions. | `myNewFile` for `path/to/my_new_file.tsx`   |

> **NOTE:** You can add additional variables via the VSCode setting `smartTemplates.customData`.

## Support and Contributions

For support or to contribute to Smart File Templates, please visit our [GitHub repository](https://github.com/tnesbitt210/smart-file-templates).

## License

Smart File Templates is available under the MIT License. Refer to the LICENSE file for detailed information.
