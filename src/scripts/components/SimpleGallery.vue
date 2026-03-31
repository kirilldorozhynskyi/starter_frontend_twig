<template>
	<div :id="id">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted } from 'vue'
import type { ILazyLoadInstance } from 'vanilla-lazyload'

import PhotoSwipeLightbox from 'photoswipe/lightbox'

const props = defineProps<{
	id: string
}>()

const lazyLoad = inject<ILazyLoadInstance | null>('lazyLoad', null)
let lightbox: PhotoSwipeLightbox | null = null

onMounted(() => {
	lazyLoad?.update()

	if (lightbox) {
		return
	}

	lightbox = new PhotoSwipeLightbox({
		gallery: `#${props.id}`,
		children: 'a',
		pswpModule: () => import('photoswipe'),
	})

	lightbox.addFilter('itemData', (itemData) => {
		const element = itemData.element

		if (element instanceof HTMLElement) {
			const iframeUrl = element.dataset.iframeUrl

			if (iframeUrl) {
				itemData.iframeUrl = iframeUrl
			}
		}

		return itemData
	})

	lightbox.on('contentLoad', (event) => {
		const { content } = event

		if (content.type !== 'iframe' || !content.data.iframeUrl) {
			return
		}

		event.preventDefault()

		content.element = document.createElement('div')
		content.element.className = 'pswp__iframe-container'

		const iframe = document.createElement('iframe')
		iframe.setAttribute('allowfullscreen', '')
		iframe.src = content.data.iframeUrl
		content.element.appendChild(iframe)
	})

	lightbox.init()
})

onBeforeUnmount(() => {
	lightbox?.destroy()
	lightbox = null
})
</script>
