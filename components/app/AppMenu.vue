<template>
	<div class="block mx-auto">
		<Menubar :model="model" />
	</div>
</template>

<script setup lang="ts">
	const navigation = useNavigationMenu()
	const model = navigation.navigationMenu()
</script>
