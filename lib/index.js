var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(src_exports);
var import_coc = require("coc.nvim");
async function activate(context) {
  import_coc.window.showMessage(`coc-redocly works!`);
  const serverOptions = {
    command: "/home/henry/.vscode/extensions/redocly.openapi-vs-code-0.2.9/out/server/src/server.js"
  };
  const clientOptions = {
    documentSelector: ["yaml", "json"]
  };
  const client = new import_coc.LanguageClient("coc-redocly", "redocly", serverOptions, clientOptions);
  context.subscriptions.push();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
