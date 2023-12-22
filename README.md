# Smart File Templates for VSCode

## Overview

Smart File Templates for VSCode is a powerful extension that boosts your coding efficiency by providing context-sensitive, customizable file templates. With automatic detection and suggestion of templates based on new file creation, it's an essential tool for any developer looking to streamline their workflow.

![output3](https://github.com/tnesbitt210/smart-file-templates/assets/10647853/cc088a72-fd88-486c-b088-a146967790f2)

^ Code samples for this demo can be found below!

## Repository

You can find the source code for Smart File Templates in the GitHub repository: [Smart File Templates on GitHub](https://github.com/tnesbitt210/smart-file-templates).

## Features

- **Customizable Templates:** Define and adapt your own templates to suit your unique coding style and project needs.
- **Regex-based File Matching:** Employ regular expressions to match file names and types, offering even more precise template suggestions.
- **Dynamic Content with Mustache:** Create dynamic template content with the Mustache templating syntax (see below code samples).
- **Intuitive and Integrated:** Designed to blend into your VSCode environment for a seamless experience.

## Installation

Download and install [Smart File Templates](https://marketplace.visualstudio.com/items?itemName=TrevorNesbitt.smart-file-templates) from the Visual Studio Code Marketplace to integrate it into your VSCode setup.

## Usage

### Configuring Your Templates

- **Template JSON File Location:** The `jsonConfigurationFile` setting in VSCode specifies the location of your template JSON file. By default, this is set to `.fileTemplates.json` in your workspace. You can modify this path in the VSCode settings.

- **Template JSON Structure:** Your template JSON should be formatted as follows:

> ```
> {
>  "file_pattern_regex": {
>    "label": "Template Label",
>    "template_path": "path/to/template"
>  }
>  // Additional templates can be added here
> }
> ```

- **Leveraging Regex:** Make the most of regular expressions in `file_pattern_regex` to match files more accurately and offer contextually relevant templates.
- **Dynamic Template Variables:** Smart File Templates for VSCode utilizes Mustache templating to provide dynamic content in your file templates. This feature allows you to insert context-specific data into your templates automatically. Below are the available Mustache variables:

| Variable                    | Description                                                                                 | Example Usage                               |
| --------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `{{file_path}}`             | Inserts the relative path of the file from the root of your workspace.                      | N/A                                         |
| `{{date}}`                  | Adds the current date in a localized date string format.                                    | 2023-12-21                                  |
| `{{file_name_snake_case}}`  | Provides the file name in snake_case format.                                                | `my_new_file` for `path/to/my_new_file.tsx` |
| `{{file_name_pascal_case}}` | Converts the file name to PascalCase format, useful for classes and components.             | `MyNewFile` for `path/to/my_new_file.tsx`   |
| `{{file_name_camel_case}}`  | Transforms the file name into camelCase format, typically used for variables and functions. | `myNewFile` for `path/to/my_new_file.tsx`   |

Additionally, you can extend the templating capabilities by adding custom variables in the VSCode settings under `smartTemplates.customData`. This feature allows you to tailor the templating system to your specific project needs and workflows, enhancing the flexibility and power of Smart File Templates.

## Code samples from above demo

**.fileTemplates.json**

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

**.templates/react_component.template**

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

**.templates/jest_test.template**

> ```js
> import {{file_name_pascal_case}} from './> {{file_name_snake_case}}';
>
> describe('Test {{file_name_pascal_case}}', () => {
>
>    beforeAll(() => {
>        // This code runs a single time, before all the tests.
>    });
>
>    beforeEach(() => {
>        // This code runs before each test in this describe block
>    });
>
>    it('should do something', () => {
>        expect(true).toBe(true); // Replace with your actual test
>    });
>
> });
> ```

## Support and Contributions

For support or to contribute to Smart File Templates, please visit our [GitHub repository](https://github.com/tnesbitt210/smart-file-templates).

## License

Smart File Templates is available under the MIT License. Refer to the LICENSE file for detailed information.
