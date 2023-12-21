# SmartTemplates for VSCode

## Overview

SmartTemplates for VSCode is a powerful extension that boosts your coding efficiency by providing context-sensitive, customizable file templates. With automatic detection and suggestion of templates based on new file creation, it's an essential tool for any developer looking to streamline their workflow.

## Repository

You can find the source code for SmartTemplates in the GitHub repository: [SmartTemplates on GitHub](https://github.com/tnesbitt210/smart-file-templates).

## Features

- **Automatic Template Suggestions:** Get relevant templates suggested automatically when you create a new file.
- **Customizable Templates:** Define and adapt your own templates to suit your unique coding style and project needs.
- **Dynamic Content with Mustache:** Create dynamic template content with the Mustache templating syntax.
- **Regex-based File Matching:** Employ regular expressions to match file names and types, offering even more precise template suggestions.
- **Intuitive and Integrated:** Designed to blend into your VSCode environment for a seamless experience.

## Installation

Download and install SmartTemplates from the Visual Studio Code Marketplace to integrate it into your VSCode setup.

## Usage

### Configuring Your Templates

- **Template JSON File Location:** The `jsonConfigurationFile` setting in VSCode specifies the location of your template JSON file. By default, this is set to `.vscode/fileTemplates.json` in your workspace. You can modify this path in the VSCode settings.

- **Template JSON Structure:** Your template JSON should be formatted as follows:

```
{
  "file_pattern": {
    "label": "Template Label",
    "template_path": "path/to/template"
  }
  // Additional templates can be added here
}
```

The `file_pattern` uses regular expressions to match file names, allowing for sophisticated and precise template suggestions.

### Using the Extension

- **Selecting a Template:** Upon creating a new file, if applicable, a Quick Pick dialog will appear, letting you choose a suitable template. The chosen template will populate the new file.
- **Dynamic Template Variables:** Utilize variables like `file_path`, `date`, `file_name_snake_case`, `file_name_pascal_case`, and `file_name_camel_case` in your templates. Add custom variables in `smartTemplates.customData` in the VSCode settings.

### Customizing Templates

- **Adding and Modifying Templates:** Tailor your templates according to your project's requirements, including templates for various file types and naming conventions.
- **Leveraging Regex:** Make the most of regular expressions in `file_pattern` to match files more accurately and offer contextually relevant templates.

## Demos

- {{DEMO_VIDEO_BASIC_USAGE}}: A simple guide on creating a new file and applying a template.
- {{DEMO_VIDEO_CUSTOM_TEMPLATES}}: Instructions on adding and customizing your templates.
- {{DEMO_VIDEO_DYNAMIC_CONTENT}}: Using Mustache syntax for dynamic content in templates.

## Support and Contributions

For support or to contribute to SmartTemplates, please visit our [GitHub repository](https://github.com/tnesbitt210/smart-file-templates).

## License

SmartTemplates is available under the MIT License. Refer to the LICENSE file for detailed information.
