/*
 * File: /gulpfile/tasks/browsersync.js
 * Project: starter_frontend_twig
 * Version: 1.0.0
 * Created Date: Monday, February 15th 2021, 9:46:48
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Sunday, June 6th 2021 22:49:16
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * Global Minify All Files
 */

import jdev from '../../config.json'

const globalMinifyCheck = () => {
	const gminify = {
		js: false,
		css: false,
		image: false,
	}

	// Global Minifier - will be activated on the Publish Task. Only active when the regular minfier is deactivated
	if (jdev.minify.automatic.jsFiles === false && jdev.minify.automatic.jsCombine === false && jdev.minify.automatic.jsCopy === false) {
		gminify.js = true
	} else {
		gminify.js = false
	}

	if (jdev.minify.automatic.jsFiles === false) {
		gminify.css = true
	} else {
		gminify.css = false
	}

	if (
		jdev.minify.automatic.vector === false &&
		jdev.minify.automatic.bitmaps === false &&
		jdev.minify.automatic.vectorSprite === false &&
		jdev.minify.automatic.bitmapSprite === false
	) {
		gminify.image = true
	} else {
		gminify.image = false
	}

	return gminify
}

export default globalMinifyCheck
