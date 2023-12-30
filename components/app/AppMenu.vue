<template>
	<Menubar :model="model" />
</template>

<script setup lang="ts">
	const navigation = useNavigationMenu()
	const model = navigation.navigationMenu()
</script>

<style scoped>
	:deep(.p-menubar) {
		padding: 0.2rem;
	}

	:deep(.p-menuitem-text) {
		font-size: small;
	}

	@media (min-width: 992px) {
		:deep(.p-menuitem-text) {
			font-size: large;
		}
		:deep(.p-menubar) {
			padding: 0.4rem;
		}
	}

	/* clumsy attempt to bring menu items closer together */
	@media (max-width: 960px) {
		:deep(.p-menuitem-content) {
			margin-top: -15px;
		}
	}
	@media (max-width: 480px) {
		:deep(.p-menuitem-content) {
			margin-top: -20px;
		}
	}

	/* 		*/
</style>
