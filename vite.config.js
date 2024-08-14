import path, { dirname } from 'path'
import vue from '@vitejs/plugin-vue'
import vituum from 'vituum'
import twig from '@vituum/vite-plugin-twig'
import sassGlobImports from 'vite-plugin-sass-glob-import'
import beautify from 'vite-plugin-beautify'
import viteImagemin from 'vite-plugin-imagemin'
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'

// Config
import config from './config.js'

// Custom plugins
import htmlMinifierPlugin from './scripts/htmlMinifier.js'
import purgeCSSPlugin from './scripts/purgecss.js'

import fixCSSPlugin from './scripts/fixCss.js'

import navigation from './scripts/navigation.js'

// TWIG Custom functions
import twigFunctionsSprite from './scripts/twig/sprite.js'
import twigFunctionsImage from './scripts/twig/image.js'
import twigFunctionsSvg from './scripts/twig/svg.js'

const { base, rootDir, assetsDir, imagemin, htmlBeautify, fonts, SvgSpritemap } = config

import main from './src/data/main.json'

export default {
	esbuild: {
		drop: ['console', 'debugger']
	},
	base: base,
	publicDir: 'src/public',
	build: {
		manifest: 'assets/manifest.json',
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString()
					}
				}
			}
		}
	},
	resolve: {
		alias: {
			'~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
			'~fonts': path.resolve(__dirname, fonts.dev),
			vue: 'vue/dist/vue.esm-bundler.js'
		}
	},
	plugins: [
		vituum(),
		sassGlobImports(),
		vue(),
		twig({
			root: `${rootDir}`,
			globals: {
				navigation: navigation,
				rootDir: path.resolve(__dirname, `${rootDir}`)
			},
			functions: {
				sprite($id, $classes) {
					return twigFunctionsSprite($id, $classes)
				},
				image($image) {
					return twigFunctionsImage($image)
				},
				svg($image, $classes) {
					return twigFunctionsSvg($image, $classes)
				}
			}
		}),
		viteImagemin(imagemin),
		VitePluginSvgSpritemap(path.resolve(process.cwd(), `${assetsDir}/icons/*.svg`), SvgSpritemap),
		fixCSSPlugin(),
		purgeCSSPlugin(),
		process.env.NODE_ENV == 'production'
			? vitePluginFaviconsInject(`${assetsDir}/favicon.svg`, {
					path: 'favicons/',
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
