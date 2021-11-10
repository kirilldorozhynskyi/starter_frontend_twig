/*
 * File: /gulpfile/tasks/version-bump.js
 * Project: starter_frontend_twig
 * Version: 1.0.0
 * Created Date: Sunday, October 17th 2021, 12:27:09
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, November 10th 2021 7:50:32
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * version-bump.js
 */

import gulp from 'gulp'
const { series } = require('gulp')
import bump from 'gulp-bump'
var fs = require('fs')
var semver = require('semver')
var path = require('path')

function getData(cd) {
	const allFiles = fs.readdirSync('./')

	var workspaces = []
	allFiles.forEach((item) => {
		if (path.extname(item) === '.code-workspace') {
			workspaces.push(item)
		}
	})
	if (workspaces.length) {
		const workspace = workspaces[0]

		var fileContent = fs.readFileSync(workspace, 'utf8')

		const obj = JSON.parse(fileContent)
		const version = obj.settings['psi-header.variables'][1][1]

		if (version.length) {
			const files = [
				{
					file: 'src/data/web_data.json',
					dist: './src/data/'
				}
			]

			const type = process.env.NODE_ENV
			const newVer = semver.inc(version, type)

			files.forEach((item) => {
				return gulp
					.src(item.file)
					.pipe(bump({ version: newVer }))
					.pipe(gulp.dest(item.dist))
			})

			const newstr = fileContent.replace(version, newVer)
			fs.writeFileSync(workspace, newstr, 'utf8')
		}
	} else {
		const files = [
			{
				file: 'src/data/web_data.json',
				dist: './src/data/'
			}
		]

		const type = process.env.NODE_ENV
		files.forEach((item) => {
			return gulp
				.src(item.file)
				.pipe(bump({ type: type }))
				.pipe(gulp.dest(item.dist))
		})
	}

	cd()
}

const projectBump = gulp.series(getData)

export default projectBump
