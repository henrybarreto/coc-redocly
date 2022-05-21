import {services, ExtensionContext, LanguageClient, workspace, window} from 'coc.nvim'
import {existsSync} from 'fs'
import {homedir} from 'os'

const vscodeExtensions = homedir()+'/.vscode/extensions/'

const redoclyVersion = '0.2.10'
const redoclyExtension = 'redocly.openapi-vs-code-'+redoclyVersion+'/'
const redoclyServer = 'out/server/src/server.js'

export async function activate(context: ExtensionContext): Promise<void> {
  if (!existsSync(vscodeExtensions + redoclyExtension + redoclyServer)) {
    window.showErrorMessage('Redocly.openapi-vs-code not installed')
    return
  }

  const config = workspace.getConfiguration('coc-redocly')
  const isEnable = config.get<boolean>('enable', true)
  if (!isEnable) {
    return
  }

  const serverOptions = {
    module: vscodeExtensions + redoclyExtension + redoclyServer,
    arguments: ['--node-ipc'],
  }

  const clientOptions = {
    documentSelector: ['yaml', 'json']
  }

  const client = new LanguageClient('coc-redocly', 'coc-redocly', serverOptions, clientOptions);

  context.subscriptions.push(services.registLanguageClient(client))
}
