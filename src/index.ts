import decompress from 'decompress'
import download from 'download'
import {services, ExtensionContext, LanguageClient, workspace, window, LanguageClientOptions} from 'coc.nvim'
import {existsSync} from 'fs'
import {homedir} from 'os'

class Redocly {
	private path: string
	private version: string;
	private file: string

	/**
	 * Creates a new instance of Redocly.
	 * Redocly is a class with the necessary actions to download and install the Redocly VSCode extension to coc-redocly.
	 *
	 * @param path Path constant is the path where we download and decompress the Redocly extension.
	 * @param version Version constant is the version what we download and decompress to the Redocly extension.
	 */
	constructor(path: string, version: string) {
		this.path = path
		this.version = version
		this.file = '/Redocly.openapi-vs-code-'+this.version+'.vsix'
	}

	/**
	 * getServer gets the path to the server file. 
	 * Server file is what we run to start the Redocly Language Server.
	 */
	getServer(): string {
		return this.path+this.version+'/extension/out/server/src/server.js'
	}

	/**
	 * getServer gets the files supported by coc-redocly. 
	 */
	getSupportedFiles(): Array<string> {
		return ['yaml', 'yml', 'json']
	}

	/**
	 * isDownloaded checks if the extension is already download checking if the file exists with the set version. 
	 */
	isDownloaded(): boolean {
		return existsSync(this.path+this.version+this.file)
	}

	async download() {
		await download('https://marketplace.visualstudio.com/_apis/public/gallery/publishers/Redocly/vsextensions/openapi-vs-code/'+this.version+'/vspackage', this.path+this.version);
	}

	/**
	 * isInstalled checks if the extension is already installed checking if '/extensions' folder exists with the set version. 
	 */
	isInstalled(): boolean {
		return existsSync(this.path+this.version+'/extension')
	}

	async install() {
		await decompress(this.path+this.version+this.file, this.path+this.version)
	}
} 
/**
 * Path constant is the path where we download and decompress the Redocly extension. 
 */
const PATH = '/redocly/' 
/**
 * Version constant is the version what we download and decompress to the Redocly extension. 
 */
const VERSION = '0.2.10'

export async function activate(context: ExtensionContext): Promise<void> {
  const redocly = new Redocly(context.storagePath+PATH, VERSION)
  if (!redocly.isDownloaded()) {
	  redocly.download()
	  // TODO: add error output when it could not download the extension.  
  }

  if (!redocly.isInstalled()) {
	  redocly.install()
	  // TODO: add error output when it could not install the extension.
  }

  const config = workspace.getConfiguration('coc-redocly')
  const isEnable = config.get<boolean>('enable', true)
  if (!isEnable) {

    return
  }

  const serverOptions = {
    module: redocly.getServer(),
    arguments: ['--node-ipc'],
    rootPatterns: [".redocly.yaml"],
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: redocly.getSupportedFiles() 
  }

  const client = new LanguageClient('coc-redocly', 'coc-redocly', serverOptions, clientOptions);
  client.onReady().then(() => {
	  if (client.started) {
		  const item = window.createStatusBarItem(99, {progress: false})
		  item.text = 'Redocly ' + VERSION 
		  item.show()
	  }
  })

  context.subscriptions.push(services.registLanguageClient(client))
}
