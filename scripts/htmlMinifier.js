/*
 * File: /scripts/htmlMinifier.js
 * Project: starter_frontend_twig
 * Version: 2.0.0
 * Created Date: Thursday, September 28th 2023, 14:35:53
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Thursday, September 28th 2023 14:51:36
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2023 justDev
 */

import { minify } from 'html-minifier-terser'

import config from '../config.js'

const { htmlMinify } = config

const htmlMinifierPlugin = () => {
	if (!htmlMinify.enable) return false
	return {
		name: 'html-minifier',
		enforce: 'post',
		async transformIndexHtml(html) {
			const code = await minify(html, {
				...htmlMinify.options
			})

			return code
		}
	}
}

export default htmlMinifierPlugin
