
import * as vscode from 'vscode';
import { WebviewPanel } from './WebviewPanel';
import { SidebarProvider } from './SidebarProvider';
// import { NodeDependenciesProvider } from './TreeProvider';
// import { TestView } from './TreeView';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "todo-list" is now active!');
	const rootPath =
    vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : undefined;
//   const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath ? rootPath : "");
//   vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
//   vscode.commands.registerCommand('nodeDependencies.refreshEntry', () =>
//     nodeDependenciesProvider.refresh()
//   );
	
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
	  vscode.window.registerWebviewViewProvider(
		"todolist-sidebar",
		sidebarProvider
	  )
	);

	let disposable = vscode.commands.registerCommand('todo-list.helloWorld', () => {

		vscode.window.showInformationMessage('Hello World from todo list! This is for test to check if extension is running');
	});

	


	context.subscriptions.push(disposable);

	context.subscriptions.push(vscode.commands.registerCommand('todo-list.webviewPanel', () => {
		WebviewPanel.createOrShow(context.extensionUri)
	}))

	// new TestView(context);
}

export function deactivate() {}
