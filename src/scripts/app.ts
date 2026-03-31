/*
 * File: /src/scripts/app.ts
 * Project: starter_frontend_twig
 * Version: 3.0.0
 * Created Date: Sunday, September 24th 2023, 12:07:59
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Friday, April 11th 2025 13:37:50
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2025 justDev
 */

import '../styles/app.css'

// NOTE: Include if needed
// import AOS from 'aos'

import LazyLoad from 'vanilla-lazyload'
import { computed, createApp, defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, provide } from 'vue'
import { createI18n } from 'vue-i18n'

// NOTE: Include if needed
// import VueScrollTo from 'vue-scrollto'

// Directives
import PhotoSwipeDirective from './directives/photoswipe'
// import TooltipDirective from './directives/tooltip'
// import CopyClipboard from './directives/clipboard'

import PageHeader from './components/PageHeader.vue'
import i18nConfig from './util/i18n.ts'

const SimpleGallery = defineAsyncComponent(() => import('./components/SimpleGallery.vue'))
const i18n = createI18n(i18nConfig)

const PREVENT_UNLOAD_SELECTORS = [
	'.ajax',
	'.download',
	'#scroll-to-top',
	'[download]',
	'[href^=\\#]',
	'[href*=ajax]',
	'[href^=javascript]',
	'[href^=mailto]',
	'[href^=tel]',
	'[href*=tx_typoscriptrendering]',
	'[target^=_blank]',
]
const SCROLL_OFFSET = 64

export const rootComponent = defineComponent({
	/* == GLOBAL COMPONENTS == */
	components: {
		PageHeader,
		SimpleGallery,
		// CustomScript,
	},

	/* ======= OPTIONS ======= */
	delimiters: ['<%', '%>'],

	/* ======= DIRECTIVES ======= */
	directives: {
		photoswipe: PhotoSwipeDirective,
		// 'scroll-to': VueScrollTo,  //NOTE: Include if needed
	},

	/* ======== SETUP ======== */
	setup() {
		const lazyLoad = new LazyLoad({
			threshold: 0,
			elements_selector: '[lazy]',
			class_loading: 'lazy-loading',
			class_loaded: 'lazy-loaded',
			class_applied: 'lazy-bg-loaded',
			class_error: 'lazy-error',
		})
		const scrollOffset = computed(() => {
			const headerElement = document.querySelector<HTMLElement>('page-header header')

			return -(SCROLL_OFFSET + (headerElement?.offsetHeight ?? 0))
		})
		let unloadController: AbortController | null = null

		const createdHook = () => {
			/* Placeholder function used to extend Vue created hook in projects */
		}
		const loadedHook = () => {
			/* Placeholder function used to extend document on-load event in projects */
		}
		const mountedHook = () => {
			/* Placeholder function used to extend Vue mounted hook in projects */
		}

		const onDocumentClick = (event: MouseEvent) => {
			const target = event.target instanceof Element ? event.target.closest('a') : null

			if (!(target instanceof HTMLAnchorElement)) {
				return
			}

			if (target.matches(PREVENT_UNLOAD_SELECTORS.join(', '))) {
				return
			}

			if (event.defaultPrevented || event.ctrlKey || event.shiftKey || event.metaKey || event.button === 1) {
				return
			}

			if (target.id === 'history-back') {
				event.preventDefault()

				if (window.history.length > 1) {
					window.history.back()
				}

				return
			}

			const currentUrl = new URL(window.location.href)
			const targetUrl = new URL(target.href, window.location.href)

			if (
				targetUrl.origin === currentUrl.origin
				&& targetUrl.pathname === currentUrl.pathname
				&& targetUrl.search === currentUrl.search
			) {
				return
			}

			document.body.classList.remove('loaded')
		}

		const initUnload = () => {
			unloadController?.abort()
			unloadController = new AbortController()

			document.addEventListener('click', onDocumentClick, {
				signal: unloadController.signal,
			})
		}

		const onLoad = () => {
			document.body.classList.add('loaded')
			initUnload()
			loadedHook()
		}

		const onScroll = () => {
			const scrollToTopButton = document.querySelector<HTMLElement>('.page-return-top')

			if (!scrollToTopButton) {
				return
			}

			scrollToTopButton.classList.toggle('active', window.scrollY >= 200)
		}

		const scrollToTop = () => {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}

		provide('lazyLoad', lazyLoad)
		provide('scrollOffset', scrollOffset)
		createdHook()

		onMounted(() => {
			// AOS.init({
			// 	duration: 900,
			// 	once: true,
			// })

			if (document.readyState === 'complete') {
				onLoad()
			} else {
				window.addEventListener('load', onLoad, { once: true })
			}

			window.addEventListener('scroll', onScroll, { passive: true })
			onScroll()
			lazyLoad.update()
			document.body.classList.add('loaded')
			mountedHook()
		})

		onBeforeUnmount(() => {
			window.removeEventListener('load', onLoad)
			window.removeEventListener('scroll', onScroll)
			unloadController?.abort()
		})

		return {
			lazyLoad,
			scrollOffset,
			scrollToTop,
		}
	},
})

const app = createApp(rootComponent)
app.config.compilerOptions.isCustomElement = (tag) => tag === 'nobr'
app.use(i18n)

const appRoot = document.querySelector('#page')

if (appRoot) {
	app.mount(appRoot)
}
