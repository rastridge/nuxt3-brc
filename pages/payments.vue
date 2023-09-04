<template>
	<div id="payments">
		<div class="center-content">
			<common-header title="Payments" />
		</div>
		<div
			class="flex flex-column md:flex-row flex-wrap align-items-center md:align-items-start justify-content-center"
		>
			<Card
				v-for="item in payments"
				:key="item.id"
				style="width: 320px"
				class="flex justify-content-center shadow-6 m-2 p-3 bg-blue-600 text-white font-semibold"
			>
				<!-- <template #header> {{ item.title }}</template> -->
				<template #subtitle>
					<span class="text-white font-bold">{{ item.title }}</span></template
				>
				<template #content>
					<span v-html="item.payment_paypal_button"></span
				></template>
			</Card>
		</div>
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()

	//
	// Get current news
	//
	const {
		data: payments,
		pending,
		error,
		refresh,
	} = await useFetch('/payments/getallcurrent', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})
</script>
