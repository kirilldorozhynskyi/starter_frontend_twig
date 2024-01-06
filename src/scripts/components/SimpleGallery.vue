<template>
	<div :id="id">
		<slot />
	</div>
</template>

<script>
import { defineComponent, onMounted, inject } from 'vue'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export default defineComponent({
	props: {
		id: {
			type: String,
			required: true
		}
	},

	setup() {
		const lazyLoad = inject('lazyLoad')

		onMounted(() => {
			lazyLoad.update()
		})
	},
	mounted() {
		if (!this.lightbox) {
			this.lightbox = new PhotoSwipeLightbox({
				gallery: '#' + this.$props.id,
				children: 'a',
				pswpModule: () => import('photoswipe')
			})

			this.lightbox.addFilter('itemData', (itemData, index) => {
				const iframeUrl = itemData.element.dataset.iframeUrl
				if (iframeUrl) {
					itemData.iframeUrl = iframeUrl
				}
				return itemData
			})

			// override slide content
			this.lightbox.on('contentLoad', (e) => {
				const { content } = e
				if (content.type === 'iframe') {
					e.preventDefault()

					content.element = document.createElement('div')
					content.element.className = 'pswp__iframe-container'

					const iframe = document.createElement('iframe')
					iframe.setAttribute('allowfullscreen', '')
					iframe.src = content.data.iframeUrl
					content.element.appendChild(iframe)
				}
			})

			this.lightbox.init()
		}
	},
	unmounted() {
		if (this.lightbox) {
			this.lightbox.destroy()
			this.lightbox = null
		}
	},
	methods: {}
})
</script>
