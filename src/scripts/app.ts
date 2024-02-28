/*
 * File: /src/scripts/app.ts
 * Project: starter_frontend_twig
 * Version: 2.2.0
 * Created Date: Sunday, September 24th 2023, 12:07:59
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, February 28th 2024 21:06:32
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

/* eslint-disable */
// @ts-nocheck
import '../styles/app.scss'

// NOTE: Include if needed
// import AOS from 'aos'

import LazyLoad from 'vanilla-lazyload'
import { createApp, defineAsyncComponent, ref } from 'vue'
import type { Component } from '@vue/runtime-core'

// NOTE: Include if needed
// import VueScrollTo from 'vue-scrollto'

import PageHeader from './components/PageHeader.vue'

const SimpleGallery = defineAsyncComponent(() => import('./components/SimpleGallery.vue'))

const PREVENT_UNLOAD_CLASSES = [
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
// const DESKTOP_BREAKPOINT = 768

export const rootComponent: Component = {
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
		// 'scroll-to': VueScrollTo,  //NOTE: Include if needed
	},

	computed: {
		scrollOffset() {
			let offset = -SCROLL_OFFSET

			if (this.header && this.header.value) {
				offset -= this.header.value.offsetHeight
			}

			return offset
		},
	},

	provide() {
		return {
			lazyLoad: this.lazyLoad,
			scrollOffset: this.scrollOffset,
		}
	},

	/* ======== SETUP ======== */
	setup() {
		const header = ref<HTMLElement | null>(null)
		const lazyLoad = new LazyLoad({
			threshold: 0,
			elements_selector: '[lazy]',
			class_loading: 'lazy-loading',
			class_loaded: 'lazy-loaded',
			class_applied: 'lazy-bg-loaded',
			class_error: 'lazy-error',
		})

		return {
			header,
			lazyLoad,
		}
	},

	/* === LIFECYCLE HOOKS === */
	created() {
		window.addEventListener('load', this.onLoad)
		window.addEventListener('scroll', this.onScroll)
		this.createdHook()
	},
	mounted() {
		// AOS.init({
		// 	duration: 900,
		// 	once: true,
		// })

		this.lazyLoad.update()
		document.body.classList.add('loaded')
		this.mountedHook()
	},

	/* ======= METHODS ======= */
	methods: {
		/* === LIFECYCLE METHODS HOOKS === */
		createdHook() {
			/* Placeholder function used to extend Vue created hook in projects */
		},
		loadedHook() {
			/* Placeholder function used to extend document on-load event in projects */
		},
		mountedHook() {
			/* Placeholder function used to extend Vue mounted hook in projects */
		},

		/* ======= GENERAL METHODS ======= */
		initUnload() {
			let links = 'a'

			PREVENT_UNLOAD_CLASSES.forEach((className) => {
				links += `:not(${className})`
			})

			document.querySelectorAll<HTMLAnchorElement>(links).forEach((link) => {
				link.addEventListener('click', (event) => {
					const target = event.currentTarget as HTMLAnchorElement | null

					if (event.ctrlKey || event.shiftKey || event.metaKey || event.button === 1) {
						return true
					}
					if (target?.pathname === window.location.pathname) {
						return true
					}
					if (target?.getAttribute('id') === 'history-back') {
						event.preventDefault()
						if (window.history.length > 1) {
							window.history.back()
						}

						return false
					}
					document.body.classList.remove('loaded')

					return true
				})
			})
		},
		onLoad() {
			document.body.classList.add('loaded')
			this.initUnload()
			this.loadedHook()
		},
		onScroll() {
			/* Scroll to top show/hide */
			const scrollToTopButton = document.querySelector('.page-return-top')
			if (scrollToTopButton) {
				if (window.scrollY >= 200) {
					scrollToTopButton.classList.add('active')
				} else {
					scrollToTopButton.classList.remove('active')
				}
			}
		},
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
	},
}

const app = createApp(rootComponent)
app.mount('#page')
