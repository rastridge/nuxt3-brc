<script setup>
	import { usePrimeVue } from 'primevue/config'
	// import AppTopBar from '../components/app/AppTopbar.vue'
	// import AppFooter from '../components/app/AppFooter.vue'
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()

	import { useMenuStore } from '@/stores'
	const menuStore = useMenuStore()
	// const customMenuItems = menuStore.getCustomMenuItems
</script>

<template>
	<div>
		<!-- default start up blue primary  theme? -->
		<!-- <Link
			rel="stylesheet"
			:href="'https://cdn.jsdelivr.net/npm/primevue@3.15.0/resources/themes/vela-blue/theme.css'"
		/> -->
		<!-- 		<Link
			rel="stylesheet"
			:href="'https://cdn.jsdelivr.net/npm/primevue@3.15.0/resources/themes/saga-blue/theme.css'"
		/> -->

		<div
			class="bg-transparent border-round-lg md:border-round-xl md:m-2 p-1 md:p-2"
		>
			<app-header />
		</div>
		<div
			class="surface-400 border-round-lg md:border-round-xl shadow-6 m-0 md:m-2 p-1 md:p-2"
		>
			<slot />
		</div>
		<div v-if="!auth.isLoggedIn"><AppFooter /></div>
	</div>
</template>
