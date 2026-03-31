/*
 * File: /config.js
 * Project: starter_frontend_twig
 * Version: 3.0.0
 * Created Date: Thursday, September 28th 2023, 14:36:16
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Friday, April 11th 2025 13:35:57
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2025 justDev
 */

const config = {
	base: './',
	rootDir: 'src',
	buildDir: 'dist',
	assetsDir: 'src/public/assets',
	fonts: {
		dev: 'src/resources/fonts',
		fix: '/assets/build/',
		prod: './'
	},

	htmlMinify: {
		enable: true,
		options: {
			collapseWhitespace: true,
			removeAttributeQuotes: false,
			removeComments: true,
			sortAttributes: true,
			sortClassName: true
		}
	},
	htmlBeautify: {
		inDir: 'dist',
		html: {
			enabled: false
		},
		js: {
			enabled: false
		},
		css: {
			enabled: false
		}
	},
	imagemin: {
		gifsicle: {
			optimizationLevel: 7,
			interlaced: false
		},
		webp: {
			quality: 75
		},
		optipng: {
			optimizationLevel: 7
		},
		mozjpeg: {
			quality: 20
		},
		pngquant: {
			quality: [0.8, 0.9],
			speed: 4
		},
		svgo: {
			plugins: [
				{
					name: 'removeViewBox'
				},
				{
					name: 'removeEmptyAttrs',
					active: false
				}
			]
		}
	},
	SvgSpritemap: {
		prefix: 'icon-',
		output: {
			filename: '[name][extname]',
			name: 'spritemap.svg',
			view: true,
			use: true
		},
		svgo: {
			plugins: [
				{
					name: 'removeStyleElement'
				},
				{
					name: 'cleanupIDs'
				},
				{
					name: 'removeTitle'
				},
				{
					name: 'removeViewBox'
				},
				{
					name: 'removeUselessStrokeAndFill'
				},
				{
					name: 'removeAttrs',
					params: {
						attrs: '(fill|stroke)'
					}
				}
			]
		},
		injectSVGOnDev: true
	}
}

export default config
