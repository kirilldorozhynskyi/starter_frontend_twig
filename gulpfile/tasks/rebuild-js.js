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
 * Rebuild all JS Files
 * Copy to distribution
 */

import gulp from 'gulp'
import copyJsTask from './copy-js'

const rebuildJsTask = (cb) => {
	gulp.series(copyJsTask)
	cb()
}

export default rebuildJsTask
