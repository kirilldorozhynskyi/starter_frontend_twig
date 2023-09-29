/*
 * File: /scripts/purgecss.js
 * Project: starter_frontend_twig
 * Version: 2.0.0
 * Created Date: Tuesday, July 19th 2022, 3:27:02
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Friday, September 29th 2023 12:16:59
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2023 justDev
 */

import { PurgeCSS } from 'purgecss'

import config from '../config.js'

const { purgecss } = config

const purgeCSSPlugin = () => {
	if (!purgecss.enable) return false
	let _html = ''
	const safeList = purgecss.safeList || []
	return {
		name: 'purge-css',
		enforce: 'post',
		transformIndexHtml(html) {
			_html += html
		},
		async generateBundle(_options, bundle) {
			const cssFiles = Object.keys(bundle).filter((key) => key.endsWith('.css'))
			if (!cssFiles) return
			for (const file of cssFiles) {
				const purged = await new PurgeCSS().purge({
					content: [{ raw: _html, extension: 'html' }],
					css: [{ raw: bundle[file].source }],
					safelist: safeList
				})
				bundle[file].source = purged[0].css
			}
		}
	}
}

export default purgeCSSPlugin
