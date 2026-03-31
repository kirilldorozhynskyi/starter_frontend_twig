<template>
	<header>
		<slot :toggle-menu="toggleMenu" :menu-opened="menuOpened" />
	</header>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'

const menuOpened = ref(false)

const toggleMenu = () => {
	menuOpened.value = !menuOpened.value
}

watch(menuOpened, (isOpened) => {
	document.body.classList.toggle('overflow-hidden', isOpened)
})

onBeforeUnmount(() => {
	document.body.classList.remove('overflow-hidden')
})
</script>
