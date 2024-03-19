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
import criticalPlugin from './scripts/critical.js'
import fixCSSPlugin from './scripts/fixCss.js'

import navigation from './scripts/navigation.js'

// TWIG Custom functions
import twigFunctionsSprite from './scripts/twig/sprite.js'
import twigFunctionsImage from './scripts/twig/image.js'

const { rootDir, assetsDir, imagemin, htmlBeautify, fonts, SvgSpritemap } = config

import main from './src/data/main.json'

export default {
	base: './',
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
				sprite($id, $secondArgument) {
					return twigFunctionsSprite($id, $secondArgument)
				},
				image($image) {
					return twigFunctionsImage($image)
				}
			}
		}),
		viteImagemin(imagemin),
		VitePluginSvgSpritemap(path.resolve(process.cwd(), `${assetsDir}/icons/*.svg`), SvgSpritemap),
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
