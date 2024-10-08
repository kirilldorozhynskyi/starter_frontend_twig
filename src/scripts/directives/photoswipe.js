/*
 * File: /src/scripts/directives/photoswipe.js
 * Project: starter_frontend_twig
 * Version: 2.2.8
 * Created Date: Tuesday, May 28th 2024, 13:42:26
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, August 14th 2024 16:44:51
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

// directives/photoswipe.js
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export default {
	mounted(el) {
		let lightbox = null
		const isSingle = el.tagName.toLowerCase() === 'a'

		const initializeLightbox = () => {
			if (!lightbox) {
				lightbox = new PhotoSwipeLightbox({
					gallery: isSingle ? el.parentNode : el,
					children: isSingle ? el : 'a',
					pswpModule: () => import('photoswipe')
				})

				lightbox.addFilter('itemData', (itemData, index) => {
					const iframeUrl = itemData.element.dataset.iframeUrl
					if (iframeUrl) {
						itemData.iframeUrl = iframeUrl
					}
					const videoUrl = itemData.src
					if (videoUrl) {
						itemData.videoUrl = videoUrl
					}
					return itemData
				})

				// override slide content
				lightbox.on('contentLoad', (e) => {
					const { content } = e

					if (content.type === 'iframe') {
						e.preventDefault()

						content.element = document.createElement('div')
						content.element.className = 'pswp__iframe-container'

						const iframe = document.createElement('iframe')
						iframe.setAttribute('allowfullscreen', '')
						iframe.src = content.data.iframeUrl
						content.element.appendChild(iframe)
					} else if (content.type === 'video') {
						e.preventDefault()

						content.element = document.createElement('div')
						content.element.className = 'pswp__video-container'

						const video = document.createElement('video')
						video.setAttribute('controls', '')
						video.setAttribute('autoplay', '')
						video.src = content.data.videoUrl
						content.element.appendChild(video)
					}
				})

				lightbox.init()
			}
		}

		initializeLightbox()

		el.__photoswipe_lightbox = lightbox
	},
	unmounted(el) {
		if (el.__photoswipe_lightbox) {
			el.__photoswipe_lightbox.destroy()
			el.__photoswipe_lightbox = null
		}
	}
}
