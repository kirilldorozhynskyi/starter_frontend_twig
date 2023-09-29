import path, { dirname } from 'path'
import vue from '@vitejs/plugin-vue'

import vituum from 'vituum'
import twig from '@vituum/vite-plugin-twig'
import sassGlobImports from 'vite-plugin-sass-glob-import'
import beautify from 'vite-plugin-beautify'
import viteImagemin from 'vite-plugin-imagemin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'

import config from './config.js'

import htmlMinifierPlugin from './scripts/htmlMinifier.js'
import purgeCSSPlugin from './scripts/purgecss.js'
import criticalPlugin from './scripts/critical.js'
import fixCSSPlugin from './scripts/fixCss.js'

import twigFunctionsSprite from './scripts/twig/sprite.js'
import twigFunctionsImage from './scripts/twig/image.js'

const { rootDir, buildDir, assetsDir, imagemin, htmlBeautify, fonts } = config

import main from './src/data/main.json'

export default {
	publicDir: 'src/public',
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `assets/build/[name].js`,
				chunkFileNames: `assets/build/[name].js`,
				assetFileNames: `assets/build/[name].[ext]`
			}
		}
	},
	resolve: {
		alias: {
			'~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
			vue: 'vue/dist/vue.esm-bundler.js',
			'~fonts': path.resolve(__dirname, fonts.dev)
		}
	},

	plugins: [
		vituum(),
		sassGlobImports(),
		vue(),
		twig({
			root: `${rootDir}`,
			functions: {
				sprite($id) {
					return twigFunctionsSprite($id)
				},
				image($image) {
					return twigFunctionsImage($image)
				}
			}
		}),
		viteImagemin(imagemin),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), `${assetsDir}/icons`)],
			symbolId: 'icon-[dir]-[name]',
			customDomId: '__svg__icons__dom__'
		}),

		fixCSSPlugin(),
		purgeCSSPlugin(),
		criticalPlugin(),
		process.env.NODE_ENV == 'production'
			? vitePluginFaviconsInject(`${assetsDir}/favicon.svg`, {
					appName: main.title,
					appDescription: main.description,
					background_color: main.background_color,
					theme_color: main.theme_color,
					icons: {
						yandex: false
					}
			  })
			: false,
		beautify(htmlBeautify),
		htmlMinifierPlugin()
	]
}
