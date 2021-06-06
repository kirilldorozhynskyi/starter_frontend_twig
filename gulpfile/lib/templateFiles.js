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
 * Template Files
 * Pick the right filetype for the Watch Tasks
 */

import jdev from '../../config.json'

var envCompiler = process.env.HTML_COMPILER || true

const templateFiles = () => {
	if (envCompiler) {
		return jdev.src.template + '**/*.twig'
	} else {
		return jdev.src.structure + '**/**'
	}
}

export default templateFiles
