<script setup lang="ts">
	// import { useToast } from 'primevue/usetoast'
	import { usePrimeVue } from 'primevue/config'
	import AppTopBar from '../components/app/AppTopbar.vue'
	import AppFooter from '../components/app/AppFooter.vue'
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()

	import { useMenuStore } from '@/stores'
	const menuStore = useMenuStore()
	// const customMenuItems = menuStore.getCustomMenuItems
</script>

<template>
	<div>
		<NuxtLoadingIndicator />

		<!-- default start up blue primary  theme? -->
		<!-- <Link
			rel="stylesheet"
			:href="'https://cdn.jsdelivr.net/npm/primevue@3.15.0/resources/themes/vela-blue/theme.css'"
		/> -->
		<Link
			rel="stylesheet"
			:href="'https://cdn.jsdelivr.net/npm/primevue@3.15.0/resources/themes/saga-blue/theme.css'"
		/>
		<AppTopBar />
		<div
			:class="[
				!auth.isLoggedIn
					? 'layout-main-container'
					: 'layout-main-container-admin',
			]"
		>
			<!-- <div class="layout-main-container"> -->
			<div class="layout-main surface-400 card p-0 md:p-2 lg:p-3 my-card-styl">
				<p class="text-center text-sm">
					Refactoring in progress | Experimental
				</p>

				<slot />
			</div>
			<div v-if="!auth.isLoggedIn"><AppFooter /></div>
		</div>
	</div>
</template>
