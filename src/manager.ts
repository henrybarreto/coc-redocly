import fs from "fs";
import decompress from "decompress";
import download from "download";

function getDir(version: string): string {
  return `/redocly.openapi-vs-code-${version}`;
}

export class Manager {
  private storage: string;
  private version: string;
  private server = "/extension/out/server/src/server.js";

  constructor(storage: string, version: string) {
    this.storage = storage;
    this.version = version;

    if (!this.isInstalled()) {
      this.install();
    }
  }

  protected async download(version: string): Promise<Buffer> {
    return await download(
      `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/Redocly/vsextensions/openapi-vs-code/${version}/vspackage`
    );
  }

  protected async decompress(blob: Buffer, path: string): Promise<void> {
    await decompress(blob, path);

    return;
  }

  /** Check if the Redocly OpenAPI extension is installed in the version specified in the configuration or parameter. */
  public isInstalled(version?: string): boolean {
    if (!fs.existsSync(this.storage + getDir(version || this.version))) {
      return false;
    }

    return true;
  }

  /** Install the Redocly OpenAPI extension in the version specified in the configuration or parameter. */
  public async install(version?: string): Promise<void> {
    // On the extension storage path, create a directory for each version of the extension with a specific name, and
    // decompress the downloaded blob into that.
    const blob = await this.download(version || this.version);

    const storage = this.storage;
    const dir = getDir(version || this.version);

    await this.decompress(blob, storage + dir);

    return;
  }

  /** Get the path to the language server executable/module. */
  public getServer(version?: string): string {
    return this.storage + getDir(version || this.version) + this.server;
  }
}
