/*
 * File: /scripts/webp.js
 * Project: starter_frontend_twig
 * Version: 2.0.0
 * Created Date: Tuesday, July 19th 2022, 3:27:02
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Thursday, September 28th 2023 16:39:19
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2023 justDev
 */

import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'
;(async () => {
	await imagemin(['src/public/images/*.{jpg,png}'], {
		destination: 'src/public/images/',
		plugins: [
			imageminWebp({
				quality: 50
			})
		]
	}),
		console.log('Images converted to webp 🏞')
})()
