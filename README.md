# coc-redocly

Redocly OpenAPI language server extension for [coc.nvim](https://github.com/neoclide/coc.nvim) from [Redocly OpenAPI](https://marketplace.visualstudio.com/items?itemName=Redocly.openapi-vs-code).

## Features

- Validate your OpenAPI definitions
- Quickly preview and access referenced schemas
- Work with multi-file definitions
- Preview API documentation side-by-side with your OpenAPI definition
- Access context-aware help about OpenAPI features
- Edit API definitions through interactive forms

## Installation

To install the coc-redocly extension, run the following command in your Neovim or Vim editor:

```sh
:CocInstall coc-redocly
```

## Options

Available options:
- `redoclyOpenAPI.enable`: Enable coc-redocly extension, default: `true`
- `redoclyOpenAPI.version`: Redocly OpenAPI version, default: `0.3.4`
- `redoclyOpenAPI.trace.server`: Trace level of the server, default: `off`
- `redoclyOpenAPI.api.key`: Redocly API key, default: `null`
- `redoclyOpenAPI.api.region`: Redocly API region, default: `null`

## Redocly OpenAPI

> **Warning**
Disclaimer: I didn't have any relation with Redocly OpenAPI, I just created this extension to use it with coc.nvim.

Redocly OpenAPI is a Visual Studio Code extension that helps you write, validate, and maintain your OpenAPI documents. It warns about errors in OpenAPI definitions and lets you quickly access referenced schemas or open the files that contain them. The extension works with OpenAPI 2.0 and 3.0 definitions, and has basic support for OpenAPI 3.1.

> **Notice** The information below was copied from the Redocly OpenAPI and a bit modified by my. Check the official documentation [here](https://marketplace.visualstudio.com/items?itemName=Redocly.openapi-vs-code).*


### Configuration

To use the extension, we recommend you create a configuration file called `redocly.yaml` and place it in the root directory of your workspace. If the extension detects that this file doesn't exist, it will prompt you to create it automatically for the current workspace.

*Check the full documentation [here](https://marketplace.visualstudio.com/items?itemName=Redocly.openapi-vs-code).*

---
> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
