/*
 * File: /scripts/webp.js
 * Project: starter_frontend_twig
 * Version: 2.1.0
 * Created Date: Tuesday, July 19th 2022, 3:27:02
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Saturday, January 6th 2024 15:52:11
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'
import fs from 'fs'

function getFiles(dir, files = []) {
	const fileList = fs.readdirSync(dir)
	for (const file of fileList) {
		const name = `${dir}/${file}`
		if (fs.statSync(name).isDirectory()) {
			getFiles(name, files)
		} else {
			if (file != '.DS_Store') {
				if (file.includes('jpg') || file.includes('png')) {
					files.push({ name: name, file: file, dir: dir })
				}
			}
		}
	}

	return files
}

function getUniqueDirs(jsonArray) {
	const uniqueDirs = Array.from(new Set(jsonArray.map((item) => item.dir)))
	return uniqueDirs
}

;(async () => {
	const dir = './src/public/assets/images'

	let uniqueDirs = getUniqueDirs(getFiles(dir))

	uniqueDirs.forEach(async (img) => {
		await imagemin([img + '/*.{jpg,png}'], {
			destination: img,
			plugins: [
				imageminWebp({
					quality: 50
				})
			]
		})
	})
	console.log('Images converted to webp 🏞')
})()
