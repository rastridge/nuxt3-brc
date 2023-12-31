<template>
	<div class="layout-topbar">
		<ul class="layout-topbar-menu hidden md:flex">
			<li>
				<button class="p-link layout-topbar-button" @click="redirectToFacebook">
					<i class="pi pi-facebook" />
					<span>facebook</span>
				</button>
			</li>

			<li>
				<button class="p-link layout-topbar-button" @click="redirectToYoutube">
					<i class="pi pi-twitter" />
					<span>youtube</span>
				</button>
			</li>
			<li>
				<button
					class="p-link layout-topbar-button"
					@click="redirectToInstagram"
				>
					<i class="pi pi-instagram" />
					<span>instagram</span>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button" @click="redirectToRegister">
					<i class="pi pi-user-plus" />
					<span>Register to Join Men</span>
				</button>
			</li>
			<li>
				<button
					class="p-link layout-topbar-button"
					@click="redirectToFlagRegister"
				>
					<i class="pi pi-user-plus" />
					<span>Register to Join Flag Youth</span>
				</button>
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
		window.open('https://instagram.com/BuffaloRFC', '_blank')
	}
	function redirectToRegister(event: any) {
		navigateTo('/register')
	}
	function redirectToFlagRegister(event: any) {
		navigateTo('/registerflag')
	}
</script>
