# coc-redocly

Redocly language server extension to [coc.nvim](https://github.com/neoclide/coc.nvim) from [Redocly OpenAPI](https://marketplace.visualstudio.com/items?itemName=Redocly.openapi-vs-code).

## Redocly OpenAPI

Redocly OpenAPI is a Visual Studio Code extension that helps you write, validate, and maintain your OpenAPI documents. It warns about errors in OpenAPI definitions and lets you quickly access referenced schemas or open the files that contain them. The extension works with OpenAPI 2.0 and 3.0 definitions, and has basic support for OpenAPI 3.1.

## Installation

```vim
Plug 'henrybarreto/coc-redocly'
```

> *Notice: the information below was copied from the Redocly OpenAPI and a bit modified by my. Check the official documentation [here](https://marketplace.visualstudio.com/items?itemName=Redocly.openapi-vs-code).*
## Before you start

- The extension requires a `.redocly.yaml` configuration file in your workspace. Read how to create it in the Configuration section.
- Note that the extension only works with YAML files. Validation for JSON files is supported starting with version 0.2.0 of the extension.

## Features

- Validate your OpenAPI definitions
- Quickly preview and access referenced schemas
- Work with multi-file definitions
- ~~Preview API documentation side-by-side with your OpenAPI definition~~
- Access context-aware help about OpenAPI features
- ~~Edit API definitions through interactive forms~~

## Configuration

To use the extension, we recommend you create a configuration file called `.redocly.yaml` and place it in the root directory of your workspace. If the extension detects that this file doesn't exist, it will prompt you to create it automatically for the current workspace.

Here's an example of what your directory structure could look like:

```
.
├── workspace
│   ├── openapi-definitions
│   │   ├── production.yaml
│   │   └── test.yaml
│   ├── .redocly.yaml
│   ├── some-file.txt

```

The `.redocly.yaml` configuration file defines the criteria for validating OpenAPI definitions.

Add the following example contents to the file and save the changes:

```
apiDefinitions:
  main: path/to/your-openapi.yaml
  test: path/to/another-openapi.yaml
lint:
  extends:
    - recommended
  rules:
    tag-description: off
    operation-summary: error
    no-unresolved-refs: error
    no-unused-components: error
    operation-2xx-response: error
    operation-operationId: error
    operation-singular-tag: error
    no-enum-type-mismatch: error
    no-identical-paths: error
    no-ambiguous-paths: error
```

This will let you start working with the extension. You can modify the file at any point to control the behavior of the extension. When modifying the `.redocly.yaml` file, you must save it to disk for your changes to apply.

To learn more about built-in rules you can use, refer to the Redocly OpenAPI CLI documentation. The linting guide provides more information on how to configure the linter.

Note that you can add multiple paths to OpenAPI files under apiDefinitions, each in its own line with a custom, unique name as the key. Files listed in this section will be automatically validated by the extension when you open them in VS Code. Changes made to apiDefinitions are dynamically reflected in the preview panel.

**...**

---
> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
