<script setup lang="ts">
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
</script>

<template>
	<div :class="[!auth.isLoggedIn ? 'layout-topbar' : 'layout-topbar-admin']">
		<!-- <div class="layout-topbar"> -->
		<div v-if="!auth.isLoggedIn" class="w-full h-0 lg:h-4rem">
			<app-social />
		</div>
		<div v-if="!auth.isLoggedIn" class="w-full h-5.5rem md:h-8rem xl:h-14rem">
			<app-brand />
		</div>
		<div class="w-10rem lg:w-full h-4rem">
			<app-menu />
		</div>
	</div>
</template>
