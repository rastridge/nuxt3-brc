<template>
	<p
		v-if="alert.message"
		class="w-full"
		:class="{
			'alert-danger': alert.type === 'alert-danger',
			'alert-success': alert.type === 'alert-success',
			'alert-info': alert.type === 'alert-info',
		}"
	>
		{{ alert.message }}
	</p>
</template>

<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
</script>
