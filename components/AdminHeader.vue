<template>
	<div class="m-5 md:text-2xl">
		{{ title.charAt(0).toUpperCase() + title.slice(1) }}
		<user-logged-in />
	</div>
</template>

<script>
	export default {
		props: {
			title: { type: String, default: '', required: true },
		},
	}
</script>
