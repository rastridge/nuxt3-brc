<template>
	<div
		class="border- border-white border-round-sm md:border-round-lg w-full md:w-12 lg:w-10 mx-auto"
	>
		<ul
			class="flex gap-2 border- border-white w-30rem md:w-40rem lg:w-10 xl:w-8 mx-auto"
		>
			<li>
				<Button
					class="p-link my-text-style text-white hover:text-blue-200"
					@click="redirectToFacebook"
				>
					<i class="pi pi-facebook my-text-style" />
					<span>facebook</span>
				</Button>
			</li>

			<li>
				<Button
					class="p-link my-text-style text-white hover:text-blue-200"
					@click="redirectToYoutube"
				>
					<i class="pi pi-twitter my-text-style" />
					<span>youtube</span>
				</Button>
			</li>
			<li>
				<Button
					class="p-link my-text-style text-white hover:text-blue-200"
					@click="redirectToInstagram"
				>
					<i class="pi pi-instagram my-text-style" />
					<span>instagram</span>
				</Button>
			</li>
			<li>
				<Button
					class="p-link my-text-style text-white hover:text-blue-200"
					@click="redirectToRegister"
				>
					<i class="pi pi-user-plus my-text-style" />
					<span>Join Men</span>
				</Button>
			</li>
			<li>
				<Button
					class="p-link my-text-style text-white hover:text-blue-200"
					@click="redirectToFlagRegister"
				>
					<i class="pi pi-user-plus my-text-style" />
					<span>Join Youth</span>
				</Button>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	function redirectToFacebook(event: any) {
		window.open('https://www.facebook.com/BuffaloRugbyClub/', '_blank')
	}
	function redirectToTwitter(event: any) {
		window.open('https://twitter.com/BuffaloRFC', '_blank')
	}
	function redirectToYoutube(event: any) {
		window.open('https://youtube.com/buffalorugby', '_blank')
	}
	function redirectToInstagram(event: any) {
		window.open('https://instagram.com/buffalorugbyclub', '_blank')
	}
	function redirectToRegister(event: any) {
		navigateTo('/register')
	}
	function redirectToFlagRegister(event: any) {
		navigateTo('/registerflag')
	}
</script>

<style scoped>
	ul {
		list-style: none;
	}
	i {
		font-size: 0.7rem;
		margin-right: 0.2rem;
	}
</style>
