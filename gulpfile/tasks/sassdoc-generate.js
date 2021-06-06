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
 * Build the CSS Framework Documentation
 */

import gulp from 'gulp'
import sassdoc from 'sassdoc'

function sassdocGenerateTask() {
	return gulp.src('src/framework/**/*.scss').pipe(
		sassdoc({
			dest: 'doc/sassdoc',
		})
	)
}

export default sassdocGenerateTask
