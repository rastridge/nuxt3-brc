<script setup lang="ts">
	// import { useToast } from 'primevue/usetoast'
	import { usePrimeVue } from 'primevue/config'
	import AppTopBar from '../components/app/AppTopbar.vue'
	import AppFooter from '../components/app/AppFooter.vue'
	import { useThemeStore } from '@/stores'
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	const themeStore = useThemeStore()
	import { useWindowSize } from '@vueuse/core'
	const { width, height } = useWindowSize()
	import { useMenuStore } from '@/stores'
	const menuStore = useMenuStore()
	const customMenuItems = menuStore.getCustomMenuItems
</script>

<template>
	<div>
		<!-- default start up blue primary  theme? -->
		<Link
			rel="stylesheet"
			:href="
				themeStore.link ||
				'https://cdn.jsdelivr.net/npm/primevue@3.15.0/resources/themes/vela-blue/theme.css'
			"
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
			<div class="layout-main surface-100 card">
				width ={{ width }}

				<slot />
			</div>
			<div v-if="!auth.isLoggedIn"><AppFooter /></div>
		</div>
	</div>
</template>
