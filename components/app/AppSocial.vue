<template>
	<ul class="layout-topbar-menu hidden md:flex">
		<li>
			<button class="p-link layout-topbar-button" @click="redirectToFacebook">
				<i class="pi pi-facebook" />
				<span>facebook</span>
			</button>
		</li>
		<li>
			<button class="p-link layout-topbar-button" @click="redirectToTwitter">
				<i class="pi pi-twitter" />
				<span>twitter</span>
			</button>
		</li>
		<li>
			<button class="p-link layout-topbar-button" @click="redirectToInstagram">
				<i class="pi pi-instagram" />
				<span>instagram</span>
			</button>
		</li>
		<!-- <li><settings /></li> -->
	</ul>
</template>

<script setup lang="ts">
	function redirectToFacebook(event: any) {
		window.open('https://www.facebook.com/BuffaloRugbyClub/', '_blank')
	}
	function redirectToTwitter(event: any) {
		window.open('https://twitter.com/BuffaloRFC', '_blank')
	}
	function redirectToInstagram(event: any) {
		window.open('https://instagram.com/BuffaloRFC', '_blank')
	}
</script>
