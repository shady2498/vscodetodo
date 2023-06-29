
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "todo-list" is now active!');

	let disposable = vscode.commands.registerCommand('todo-list.helloWorld', () => {

		vscode.window.showInformationMessage('Hello World from todo list! This is for test to check if extension is running');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
