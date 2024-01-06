/*
 * File: /scripts/navigation.js
 * Project: starter_frontend_twig
 * Version: 2.1.0
 * Created Date: Friday, January 5th 2024, 18:03:36
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Saturday, January 6th 2024 15:52:07
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

import fs from 'fs'

// Recursive function to get files
function getFiles(dir, files = []) {
	const fileList = fs.readdirSync(dir)
	for (const file of fileList) {
		const name = `${dir}/${file}`
		if (fs.statSync(name).isDirectory()) {
			getFiles(name, files)
		} else {
			if (file != '.DS_Store') {
				files.push(name)
			}
		}
	}

	return files
}

const navigation = () => {
	const dir = './src/pages'

	let files = getFiles(dir)
	let url = files.map(function (str) {
		return str.replace(`${dir}`, '').replace('.json', '').replace('.twig', '')
	})

	return url
}

export default navigation
