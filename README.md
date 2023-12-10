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

> **Disclaimer**: I didn't have any relation with Redocly OpenAPI, I just created this extension to use it with coc.nvim.

Redocly OpenAPI is a Visual Studio Code extension that helps you write, validate, and maintain your OpenAPI documents. It warns about errors in OpenAPI definitions and lets you quickly access referenced schemas or open the files that contain them. The extension works with OpenAPI 2.0 and 3.0 definitions, and has basic support for OpenAPI 3.1.

### Configuration

The extension will identify and load the `redocly.yaml` on the workspace out of the box due the usage of the official language server from redocly under the hood. Check the official documentation for more information about it [here](https://marketplace.visualstudio.com/items?itemName=Redocly.openapi-vs-code).

---

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
