<template>
	<div class="start">
		<table>
			<tr>
				<td>
					<div>
						To vote, please enter your Buffalo Rugby Membership email address
						below. You will receive an email shortly with further instructions
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div>
						If you do not receive the email within 10 minutes email
						<a href="mailto:secretary@buffalorugby.org"
							>secretary@buffalorugby.org</a
						>
						for help
					</div>
				</td>
			</tr>
		</table>

		<!-- <FormKit type="form" :config="{ validationVisibility: 'live' }"> -->
		<FormKit
			type="email"
			name="email"
			label="Your BRC email address"
			validation="required|email"
			@input="handleSubmit($event)"
		>
		</FormKit>
		<!-- </FormKit> -->
	</div>
</template>

<script setup>
	const handleSubmit = (e) => {
		console.log('e=', e)
		const { data, error } = useFetch('/votes/sendballot', {
			method: 'POST',
			body: { email: e },
		})
		// navigateTo('/admin/votes/confirm')
	}
</script>
