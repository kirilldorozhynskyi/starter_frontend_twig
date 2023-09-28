import path, { dirname } from 'path'

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

import twigFunctionsSprite from './scripts/twig/sprite.js'
import twigFunctionsImage from './scripts/twig/image.js'

const { rootDir, buildDir, server, imagemin, htmlBeautify } = config

export default {
	publicDir: 'src/public',
	plugins: [
		vituum(),
		sassGlobImports(),
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
		vitePluginFaviconsInject(`${rootDir}/public/assets/favicon.svg`),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), `${rootDir}/public/assets/icons`)],
			symbolId: 'icon-[dir]-[name]',
			customDomId: '__svg__icons__dom__'
		}),

		beautify(htmlBeautify),
		purgeCSSPlugin(),
		criticalPlugin(),
		htmlMinifierPlugin()
	]
}
