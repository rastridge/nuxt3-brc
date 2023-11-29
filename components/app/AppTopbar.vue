<script setup lang="ts">
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
</script>

<template>
	<div :class="[!auth.isLoggedIn ? 'layout-topbar' : 'layout-topbar-admin']">
		<div v-if="!auth.isLoggedIn" class="w-max mx-auto h-0 lg:h-3rem mb-2">
			<app-social />
		</div>
		<div v-if="!auth.isLoggedIn" class="w-full h-5.5rem md:h-8rem xl:h-14rem">
			<app-brand />
		</div>
		<div class="w-full md:w-12 lg:w-10 xl:w-9 mx-auto h-0 lg:h-3rem">
			<app-menu />
		</div>
	</div>
</template>
