const hx = require('hbuilderx');
const getCurrentDateTime = require('./ti_notes');

function updateNotes() {
	let config = hx.workspace.getConfiguration()
	let Author = config.get("Author");
	let isLastEdit = config.get("isLastEdit");
	if (!isLastEdit) {
		let editorPromise = hx.window.getActiveTextEditor();
		editorPromise.then(async (editor) => {
			try {
				const line3 = await editor.document.lineAt(3)
				const line4 = await editor.document.lineAt(4)
				if (line3.text.includes(' @LastEditors') && line4.text.includes(' @LastEditTime')) {
					editor.edit(editBuilder => {
						editBuilder.replace({
							start: line3.start,
							end: line3.end
						}, ` * @LastEditors: ${Author}`);
						editBuilder.replace({
							start: line4.start,
							end: line4.end
						}, ` * @LastEditTime: ${getCurrentDateTime.getCurrentDateTime()}`);
					});
				}
			} catch (e) {
				hx.window.showInformationMessage('添加注释异常！请重新尝试！');
			}
		})
	}
}

module.exports = {
	updateNotes
};