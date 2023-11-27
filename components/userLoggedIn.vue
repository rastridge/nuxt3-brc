<template>
	<div>
		<p class="text-sm">Admin user: {{ sess.admin_user_name }}</p>
	</div>
</template>

<script setup>
	// import { useAuthStore } from '~/stores/authStore'
	// const auth = useAuthStore()
	// use store or session??
	const sess = JSON.parse(sessionStorage.getItem('auth'))
</script>
