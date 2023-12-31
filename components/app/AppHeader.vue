<script setup lang="ts">
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
</script>

<template>
	<div class="layout-header">
		<div v-if="!auth.isLoggedIn" class="order-1 border-blue p-2">
			<app-social />
		</div>
		<div v-if="!auth.isLoggedIn" class="order-1 border-white p-2">
			<app-brand />
		</div>
		<div class="order-1 border-white p-2">
			<app-menu />
		</div>
	</div>
</template>
