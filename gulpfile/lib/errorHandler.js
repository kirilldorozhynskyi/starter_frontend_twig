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
 * Error Handler for Gulp
 */

import notify from 'gulp-notify'
import yargs from 'yargs'
const args = yargs.argv

function errorHandler(errorObject, callback) {
	const env = args.env || 'development'

	notify
		.onError(function (options) {
			const message = options.message || options
			return message.toString().split(': ').join(':\n')
		})
		.apply(this, arguments)

	// Keep gulp from hanging on this task
	if (typeof this.emit === 'function' || env === 'development') this.emit('end')

	// Crash Build Process on error in production-mode
	if (env !== 'development') process.exit(1)
}

export default errorHandler
