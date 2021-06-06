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
 * Minify Content Images
 * @description Compress all Images in distribution
 * Inline Images (SVG, PNG, JPG, GIF)
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import minifyImages from '../lib/minifyImage'

const $ = gulpLoadPlugins()

function minifyContentimagesTask(cb) {
	// Call the Function
	minifyImages(jdev.dist.contentimage, jdev.dist.contentimage)
	cb()
}

export default minifyContentimagesTask
