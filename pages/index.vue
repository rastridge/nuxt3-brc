<template>
	<!-- randomize the background image -->

	<!-- 	<div
		class="bg-no-repeat bg-cover bg-center w-full pt-4"
		style="min-height: 900px; background-image: url('/2019_nyrc.jpg')"
	></div> -->

	<div class="border-3">
		<carousel :autoplay="6000" :wrap-around="true">
			<Slide v-for="slide in images" :key="slide.id">
				<div class="carousel__item">
					<!-- <img :src="`${slide.url}`" style="width:1600" width="1600" /> -->
					<img :src="`${slide.url}`" style="width: 1600px" />
				</div>
			</Slide>
		</carousel>
	</div>
</template>

<script setup>
	// import 'vue3-carousel/dist/carousel.css'
	const images = ref([
		{ id: 1, url: '/2019_nyrc.jpg' },
		// { id: 2, url: '/2023_Saranac_Lake.jpg' },
		{ id: 2, url: '/2019_nyrc.jpg' },
		{ id: 3, url: '/2019_nyrc.jpg' },
	])
</script>

<style scoped>
	.carousel__item {
		border: solid 3px yellow;
		width: 100%;
		background-color: black;
		background-size: cover;
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
