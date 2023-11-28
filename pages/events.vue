<template>
	<div id="events">
		<div class="center-content">
			<common-header title="Events" />
		</div>
		<div>
			<Card
				v-for="item in events"
				:key="item.id"
				class="flex justify-content-left shadow-6 m-2 p-3 bg-blue-600 text-white font-semibold"
			>
				<template #header>
					{{ $dayjs(item.event_dt).format('LL') }}
				</template>
				<template #subtitle>
					<span class="text-xl text-white font-semibold">{{
						item.title
					}}</span></template
				>
				<template #content
					>{{ item.event_description }} LOCATION:
					{{ item.event_location }}</template
				>
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
		data: events,
		pending,
		error,
		refresh,
	} = await useFetch('/events/getallcurrent', {
		method: 'get',
	})
</script>

<!-- <style scoped>
	.card-container::v-deep .p-card {
		padding: 1rem;
		margin-top: 1rem;
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.12),
			0px 4px 5px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
	}
</style> -->
