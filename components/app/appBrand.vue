<template>
	<div
		style="background-color: transparent"
		class="flex justify-content-center text-3xl md:text-4xl lg:text-6xl xl:text-8xl uppercase font-bold text-red-900"
	>
		<div class="flex align-items-center justify-content-center">
			<span style="text-shadow: 2px 2px 6px rgb(233, 233, 233)">Buffalo</span>
		</div>
		<div class="flex align-items-center justify-content-center">
			<img :src="bfloblue" class="w-6rem md:w-8rem xl:w-16rem" />
		</div>
		<div class="flex align-items-center justify-content-center">
			<span style="text-shadow: 2px 2px 6px rgb(233, 233, 233)">Rugby</span>
		</div>
	</div>
	<p class="text-center text-sm md:text-xl lg:text-2xl text-gray">
		Home Field Delaware Park | Meet up KO's Bar and Grille
	</p>
</template>

<script setup>
	import bfloblue from '~/assets/imgs/bflo_blue.png'
</script>
