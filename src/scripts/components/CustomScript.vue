<template>
	<div ref="container" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
	defineProps<{
		async?: boolean
		defer?: boolean
		src: string
	}>(),
	{
		async: false,
		defer: false,
	},
)

const container = ref<HTMLElement | null>(null)
let scriptElement: HTMLScriptElement | null = null

onMounted(() => {
	if (!container.value || scriptElement) {
		return
	}

	scriptElement = document.createElement('script')
	scriptElement.src = props.src
	scriptElement.async = props.async
	scriptElement.defer = props.defer

	container.value.appendChild(scriptElement)
})

onBeforeUnmount(() => {
	scriptElement?.remove()
	scriptElement = null
})
</script>
