<template>
	HOST = {{ HOST }} tracking = {{ tracking }}
	<img :src="tracking" height="1" width="1" />

	<div class="car">
		<Carousel :value="images" :numVisible="1" circular :autoplayInterval="6000">
			<template #item="slotProps">
				<div class="text-center">
					<img :src="slotProps.data.url" class="w-full" />
				</div>
			</template>
		</Carousel>
	</div>
</template>

<script setup>
	const { HOST } = useRuntimeConfig()
	const tracking = ref(
		`https://thebuffalorugby.club/newsletters/track?account_id=1&newsletter_id=1`
	)
	// const tracking = ref(`/newsletters/track?account_id=1&newsletter_id=1`)
	const images = ref([
		{ id: 1, url: '/carousel/2019_nyrc.jpg' },
		{ id: 2, url: '/carousel/2021NYRCMike.png' },
		{ id: 3, url: '/carousel/AST_1629.png' },
		{ id: 4, url: '/carousel/AST_1945.png' },
		{ id: 5, url: '/carousel/AST_6696.png' },
		{ id: 6, url: '/carousel/bfo rugby.png' },
		{ id: 7, url: '/carousel/DSC_4148.png' },
		{ id: 8, url: '/carousel/DSC_5371.png' },
		{ id: 9, url: '/carousel/team.png' },
		{ id: 10, url: '/carousel/Version 2.png' },
	])
</script>
