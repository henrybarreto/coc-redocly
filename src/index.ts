import { commands, CompleteResult, ExtensionContext, LanguageClient, listManager, sources, window, workspace } from 'coc.nvim';

export async function activate(context: ExtensionContext): Promise<void> {
  window.showMessage(`coc-redocly works!`);

  const config = workspace.getConfiguration('coc-redocly')
  const isEnable = config.get<boolean>('enable', true)
  if (!isEnable) {
    return
  }

  const serverOptions = {
      module: '/home/henry/.vscode/extensions/redocly.openapi-vs-code-0.2.9/out/server/src/server.js',
      arguments: ['--node-ipc']
  }

  const clientOptions = {
      documentSelector: ['yaml', 'json']
  }

  const client = new LanguageClient('coc-redocly', 'redocly', serverOptions, clientOptions);

  //context.subscriptions.push()
  /*
  context.subscriptions.push(
    commands.registerCommand('coc-redocly.Command', async () => {
      //window.showMessage(`coc-redocly Commands works!`);
    }),

    listManager.registerList(new DemoList(workspace.nvim)),

    sources.createSource({
      name: 'coc-redocly completion source', // unique id
      doComplete: async () => {
        const items = await getCompletionItems();
        return items;
      },
    }),

    workspace.registerKeymap(
      ['n'],
      'redocly-keymap',
      async () => {
        window.showMessage(`registerKeymap`);
      },
      { sync: false }
    ),

    workspace.registerAutocmd({
      event: 'InsertLeave',
      request: true,
      callback: () => {
        window.showMessage(`registerAutocmd on InsertLeave`);
      },
    })
  );
  */
}

/*
async function getCompletionItems(): Promise<CompleteResult> {
  return {
    items: [
      {
        word: 'TestCompletionItem 1',
        menu: '[coc-redocly]',
      },
      {
        word: 'TestCompletionItem 2',
        menu: '[coc-redocly]',
      },
    ],
  };
}
*/

