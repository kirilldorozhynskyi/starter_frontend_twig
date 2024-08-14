/*
 * File: /config.js
 * Project: starter_frontend_twig
 * Version: 2.2.8
 * Created Date: Thursday, September 28th 2023, 14:36:16
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, August 14th 2024 19:06:07
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
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
	purgecss: {
		enable: true,
		safeList: [
			'container',
			'row',
			'spacer',
			'aos-animate',
			'col',
			'[type=button]',
			'v-application p',
			'/^v-.*/',
			'/^col-.*/',
			'/^theme-.*/',
			'/^rounded-.*/',
			'/^data-aos-.*/',
			'/^(red|grey)--text$/',
			'/^text--darken-[1-4]$/',
			'/^text--lighten-[1-4]$/',
			'/^post-content/',
			'/^v-input/',
			'/^swiper-.*/',
			'/^pswp.*/'
		]
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
					name: 'cleanupIds'
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
