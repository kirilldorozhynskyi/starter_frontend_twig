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
 * @description Combine Scripts from Browser to script.js
 * Added as Alternative to Browserify
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()

function combineJsTask() {
	return gulp.src(jdev.files.jsCombine.files).pipe($.concat(jdev.files.jsCombine.filename)).pipe(gulp.dest(jdev.dist.js))
}

export default combineJsTask
