import fs from "fs";
import decompress from "decompress";
import {
  services,
  ExtensionContext,
  LanguageClient,
  workspace,
  window,
  LanguageClientOptions,
  ServerOptions,
} from "coc.nvim";

import { get, install } from "./manager";

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration("redoclyOpenAPI");
  if (!config.get<boolean>("enable", true)) {
    window.showMessage("coc-redocly disabled");

    return;
  }

  window.showMessage("coc-redocly activated");

  if (!config.has("version")) {
    window.showErrorMessage("coc-redocly version not set");

    return;
  }

  const version = config.get<string>("version");
  if (version == "" || !version) {
    window.showErrorMessage("coc-redocly version is empty");

    return;
  }

  // TODO: parse the version string and check if it is a valid version.

  const storage = context.storagePath;

  const dir = "/redocly.openapi-vs-code-" + version;

  // check if the extension is already installed.
  if (!fs.existsSync(storage + dir)) {
    try {
      window.showMessage("coc-redocly downloading version " + version);
      const blob = await get(version);

      window.showMessage("coc-redocly installing in " + storage + dir);
      await install(blob, storage + dir);

      window.showMessage("coc-redocly installed to version " + version);
    } catch (e) {
      window.showErrorMessage("coc-redocly failed to install due to " + e);

      return;
    }
  }

  const out = "/extension/out/server/src/server.js";

  // path is the directory where the extension is installed concatened with the directory of the extension after decompression.
  const path = storage + dir + out;

  const serverOptions: ServerOptions = {
    module: path,
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: ["yml", "yaml", "json"],
  };

  const client = new LanguageClient(
    "coc-redocly",
    "coc-redocly",
    serverOptions,
    clientOptions
  );

  if (!client.started) {
    client.start();
  }

  window.showMessage("coc-redocly started");

  context.subscriptions.push(services.registLanguageClient(client));
}
