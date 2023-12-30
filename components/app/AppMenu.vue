<template>
	<Menubar :model="model" />
</template>

<script setup lang="ts">
	const navigation = useNavigationMenu()
	const model = navigation.navigationMenu()
</script>

<style>
	.p-menuitem-text {
		font-size: small;
	}
	@media (min-width: 992px) {
		.p-menuitem-text {
			font-size: large;
		}
	}

	/* clumsy attempt to bring menu items closer together */
	@media (max-width: 960px) {
		.p-menuitem-content {
			margin-top: -20px;
		}
	}
	/* 		*/
</style>
