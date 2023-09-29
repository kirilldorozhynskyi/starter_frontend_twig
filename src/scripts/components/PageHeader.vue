<template>
	<header ref="root" :class="{ 'header--hidden': isHidden }">
		<slot :toggle-mobile-nav="toggleMobileNav" />
	</header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Dropdown from 'bootstrap/js/dist/dropdown'

const SCROLL_DELTA = 50

export default defineComponent({
	data() {
		return {
			isSearchOpened: false
		}
	},
	setup() {
		let isHidden = ref(false)
		let lastScrollPosition = window.scrollY
		const root = ref<HTMLElement>()

		window.addEventListener('scroll', () => {
			if (window.scrollY >= 0) {
				if (Math.abs(window.scrollY - lastScrollPosition) >= SCROLL_DELTA) {
					isHidden.value = window.scrollY >= lastScrollPosition
					lastScrollPosition = window.scrollY
				}
			}
		})

		function toggleMobileNav() {
			let mobileNav = document.querySelector('.mobile-nav')
			if (mobileNav) {
				document.body.classList.toggle('mobile-nav-opened')
			}
		}

		onMounted(() => {
			let dropdownElements = root.value ? Array.from(root.value.querySelectorAll('[data-bs-toggle="dropdown"]')) : []
			if (dropdownElements.length) {
				dropdownElements.map((item: any) => {
					return new Dropdown(item)
				})
			}
		})

		return {
			isHidden,
			toggleMobileNav,
			root
		}
	}
})
</script>
