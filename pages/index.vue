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
					<img :src="`${slide.url}`" class="respond" />
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
		width: 100%;
		background-color: rgb(62, 62, 62);
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.respond {
		width: 455px;
	}
	@media screen and (min-width: 501px) {
		.respond {
			width: 920px;
		}
	}
	/* 	@media screen and (min-width: 600px) {
		.respond {
			width: 870px;
		}
	} */
	@media screen and (min-width: 768px) {
		.respond {
			width: 1180px;
		}
	}
	@media screen and (min-width: 1000px) {
		.respond {
			width: 1380px;
		}
	}
	@media screen and (min-width: 1200px) {
		.respond {
			width: 1500px;
		}
	}
</style>
