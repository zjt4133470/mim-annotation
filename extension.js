const hx = require('hbuilderx');
const insertNotes = require('./api/in_notes.js');
const updateNotes = require('./api/ud_notes.js');

// 该方法将在插件激活的时候调用
function activate(context) {
	const insert = hx.commands.registerCommand('extension.insert', () => {
		insertNotes.insertNotes();
	});
	const willSaveTextDocumentEventDispose = hx.workspace.onWillSaveTextDocument(() => {
		updateNotes.updateNotes();
	});

	// 订阅销毁钩子，插件禁用的时候，自动注销该 command。
	context.subscriptions.push(insert);
	context.subscriptions.push(willSaveTextDocumentEventDispose);
}

// 该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};