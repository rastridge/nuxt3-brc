<template>
	<div class="mx-auto w-10">
		<Menubar :model="model" />
	</div>
</template>

<script setup lang="ts">
	const navigation = useNavigationMenu()
	const model = navigation.navigationMenu()
</script>

<style>
	.p-menuitem-text {
		font-size: medium;
	}

	@media (min-width: 992px) {
		.p-menuitem-text {
			font-size: large;
		}
	}
</style>
