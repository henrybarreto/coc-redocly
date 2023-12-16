import {
  ExtensionContext,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  services,
  window,
  workspace,
} from "coc.nvim";

import { Manager } from "./manager";

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
  if (version === "" || !version) {
    window.showErrorMessage("coc-redocly version is empty");

    return;
  }

  // TODO: parse the version string and check if it is a valid version.

  const manager = new Manager(context.storagePath, version);
  if (!manager.isInstalled()) {
    try {
      window.showMessage("coc-redocly installing version: " + version);
      await manager.install();

      window.showMessage("coc-redocly installed");
    } catch (e) {
      window.showErrorMessage(`coc-redocly failed to install due to ${e}`);

      return;
    }
  }

  const serverOptions: ServerOptions = {
    module: manager.getServer(),
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

  context.subscriptions.push(services.registLanguageClient(client));
}
