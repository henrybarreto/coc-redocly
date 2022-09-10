import fs from "fs";
import { window } from "coc.nvim";
import decompress from "decompress";
import download from "download";

export async function get(version: string): Promise<Buffer> {
  const link =
    "https://marketplace.visualstudio.com/_apis/public/gallery/publishers/Redocly/vsextensions/openapi-vs-code/" +
    version +
    "/vspackage";

  try {
    return await download(link);
  } catch (e) {
    throw e;
  }
}

export async function install(blob: Buffer, path: string): Promise<any> {
  try {
    return await decompress(blob, path);
  } catch (e) {
    throw e;
  }
}
