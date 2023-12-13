<script setup>
	import { useMenuStore, useAuthStore } from '@/stores'
	// import { useAuthStore } from '~/stores/authStore'
	import '@formkit/themes/genesis'
	// import '~/sass/layout/genesis/theme.css'
	const auth = useAuthStore()
	const menuStore = useMenuStore()

	useHead({
		title: 'Nuxt 3 Buffalo Rugby',
	})

	//
	// get custom menu items
	await menuStore.initCustomMenuItems()

	// stay logged in?
	if (localStorage.getItem('auth')) {
		auth.loginAuto()
	}
</script>

<template>
	<NuxtLayout>
		<div>
			<NuxtLoadingIndicator :color="red" :height="10" />
			<NuxtPage />
		</div>
	</NuxtLayout>
</template>

<style lang="scss">
	@import 'App.scss';
</style>
