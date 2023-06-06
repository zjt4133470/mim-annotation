const hx = require('hbuilderx');
const getCurrentDateTime = require('./ti_notes');

function insertNotes() {
	const editorPromise = hx.window.getActiveTextEditor();
	const config = hx.workspace.getConfiguration();
	const Author = config.get('Author');
	const isLastEdit = config.get('isLastEdit');

	editorPromise.then(async (editor) => {
		const document = editor.document;
		const selection = editor.selection;
		const extname = document.languageId;

		try {
			const line = await document.lineAt(0);
			const line2 = await document.lineAt(1);

			// 判断是否注释过
			if (!line.text.includes('<!--') && !line2.text.includes('*')) {
				// 在起始位置添加注释
				selection.start = 0;
				selection.end = 0;

				let template = '';

				// 是否取消最后修改的时间和作者
				if (isLastEdit) {
					template = [
						` * @Author: ${Author}`,
						` * @Date:  ${getCurrentDateTime.getCurrentDateTime()}`,
						` * @LastEditors: ${Author}`,
						` * @LastEditTime: ${getCurrentDateTime.getCurrentDateTime()}`,
					];
				} else {
					template = [
						` * @Author: ${Author}`,
						` * @Date: ${getCurrentDateTime.getCurrentDateTime()}`,
						` * @LastEditors: ${Author}`,
						` * @LastEditTime: ${getCurrentDateTime.getCurrentDateTime()}`,
						' * @Description: Write your own Settings, e.g. Loading css etc',
						` * Licensed under the ${Author} license.`,
					];
				}

				if (extname === 'vue' || extname === 'html') {
					template.unshift('<!--');
					template.push('-->');
				} else {
					template.unshift('/**');
					template.push(' **/');
				}

				const values = template.join('\n');
				editor.edit((editBuilder) => {
					editBuilder.insert(0, values + '\n');
				});
			}
		} catch (e) {
			hx.window.showInformationMessage('添加注释异常！请重新尝试！');
		}
	});
}

module.exports = {
	insertNotes,
};