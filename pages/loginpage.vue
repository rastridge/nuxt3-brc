<template>
	<div id="loginpage">
		<div class="topsectioncenter">
			<div v-if="!auth.isLoggedIn" class="topsectionitem my-card-style p-3">
				<div class="text-center mb-5">
					<div class="text-white md:text-xl font-medium mb-3">
						Login Admin User
					</div>
				</div>
				<FormKit type="form" submit-label="Login" @submit="handleSubmit">
					<display-alert />
					<FormKit
						type="text"
						name="username"
						label="Username"
						validation="required|length:3"
						validation-visibility="live"
						:validation-messages="{
							matches: 'Username must be at least 3 chars',
						}"
					>
					</FormKit>

					<FormKit
						type="password"
						name="password"
						label="Password"
						validation="required|length:5"
						validation-visibility="live"
						:validation-messages="{
							matches: 'Password must be at least 5 chars',
						}"
					>
					</FormKit>

					<div class="flex align-items-center justify-content-between mb-6">
						<div class="flex align-items-center">
							<span class="text-sm">Keep me logged in&nbsp;</span>
							<Checkbox
								:binary="true"
								v-model="keeploggedin"
								class="mr-2"
							></Checkbox>
						</div>

						<nuxt-link
							to="/resetpassword"
							class="text-sm no-underline ml-2 text-blue-500 text-right cursor-pointer"
							active-class="active"
							><a>Forgot password?</a></nuxt-link
						>
					</div>
				</FormKit>
				<display-cancelform />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()

	const keeploggedin = ref(false)

	const handleSubmit = async (state) => {
		// console.log(state.username + state.password + keeploggedin.value)
		if (state.username && state.password) {
			auth.login(state.username, state.password, keeploggedin.value) // pinia auth store
		}
	}
</script>
