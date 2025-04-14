<template>
	<slot :toggle-menu="toggleMenu" :menu-opened="menuOpened" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const menuOpened = ref(false)

const isSticky = ref(false)

const toggleMenu = () => {
	menuOpened.value = !menuOpened.value

	document.querySelector('body').classList.toggle('overflow-hidden')
}

// const stickyMenu = () => {
// 	window.addEventListener('scroll', () => {
// 		let scrollY = window.scrollY
// 		if (scrollY >= 80 && !isSticky.value) {
// 			isSticky.value = true
// 		} else if (scrollY <= 80) {
// 			isSticky.value = false
// 		}
// 	})
// }

onMounted(() => {
	// stickyMenu()
})
</script>
