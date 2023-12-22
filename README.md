# SmartTemplates for VSCode

## Overview

SmartTemplates for VSCode is a powerful extension that boosts your coding efficiency by providing context-sensitive, customizable file templates. With automatic detection and suggestion of templates based on new file creation, it's an essential tool for any developer looking to streamline their workflow.

## Repository

You can find the source code for SmartTemplates in the GitHub repository: [SmartTemplates on GitHub](https://github.com/tnesbitt210/smart-file-templates).

## Features

- **Customizable Templates:** Define and adapt your own templates to suit your unique coding style and project needs.
- **Regex-based File Matching:** Employ regular expressions to match file names and types, offering even more precise template suggestions.
- **Dynamic Content with Mustache:** Create dynamic template content with the Mustache templating syntax.
- **Intuitive and Integrated:** Designed to blend into your VSCode environment for a seamless experience.

## Installation

Download and install SmartTemplates from the Visual Studio Code Marketplace to integrate it into your VSCode setup.

## Usage

### Configuring Your Templates

- **Template JSON File Location:** The `jsonConfigurationFile` setting in VSCode specifies the location of your template JSON file. By default, this is set to `.fileTemplates.json` in your workspace. You can modify this path in the VSCode settings.

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

## Demo

https://github.com/tnesbitt210/smart-file-templates/assets/10647853/e84e8328-df34-4a10-b64b-02164ecd1154

#### Code samples from this demo

**.fileTemplates.json**

```json
{
  ".*\\.tsx": {
    "label": "React Component",
    "template_path": ".templates/react_component.template"
  },
  ".*\\.test\\.ts": {
    "label": "Jest Test",
    "template_path": ".templates/jest_test.template"
  }
}
```

**.react_component.template**

```js
import React from 'react';

interface {{file_name_pascal_case}}Props {
    // Define your component props here
}

const {{file_name_pascal_case}}: React.FC<{{file_name_pascal_case}}Props> = (props) => {
    return (
        <div>

        </div>
    );
};

export default {{file_name_pascal_case}};
```

**.jest_test.template**

```js
import {{file_name_pascal_case}} from './{{file_name_snake_case}}';

describe('Test {{file_name_pascal_case}}', () => {

    beforeAll(() => {
        // This code runs a single time, before all the tests.
    });

    beforeEach(() => {
        // This code runs before each test in this describe block
    });

    it('should do something', () => {
        expect(true).toBe(true); // Replace with your actual test
    });

});
```

## Support and Contributions

For support or to contribute to SmartTemplates, please visit our [GitHub repository](https://github.com/tnesbitt210/smart-file-templates).

## License

SmartTemplates is available under the MIT License. Refer to the LICENSE file for detailed information.
