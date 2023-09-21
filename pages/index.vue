<template>
	<!-- randomize the background image -->

	<!-- 	<div
		class="bg-no-repeat bg-cover bg-center w-full pt-4"
		style="min-height: 900px; background-image: url('/2019_nyrc.jpg')"
	></div> -->

	<!-- <carousel :settings="settings" autoplay="3000" transition="600" wrapAround>
		<slide v-for="slide in images" :key="slide">
			<div class="carousel__item"><img :src="slide.url" /></div>
		</slide>
	</carousel> -->

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
