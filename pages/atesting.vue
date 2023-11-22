<template>
	<table>
		<tr>
			<th>datetime</th>
			<!-- <th>datetime dayjs</th>
			<th>datetime dayjs format</th>
			<th>timestamp</th>
			<th>timestamp dayjs</th>
			<th>timestamp dayjs format</th> -->
		</tr>
		<tr v-for="date in dates">
			<td>literal {{ date.datetime_type }} /</td>
			<td>dayjs {{ $dayjs(date.datetime_type).format('YYYY-MM-DD') }} /</td>
			<!-- <td>local {{ $dayjs(date.datetime_type).format('LLL') }}</td>
			<td>literal {{ date.timestamp }} /</td>
			<td>iso {{ $dayjs(date.timestamp) }} /</td>
			<td>local {{ $dayjs(date.timestamp).format('LLL') }}</td> -->
		</tr>
	</table>
	Form contains last value
	<FormKit
		type="form"
		:config="{ validationVisibility: 'live' }"
		v-model="state"
		submit-label="Submit"
		@submit="submitForm(state)"
	>
		<FormKit type="date" label="datetime_type" name="datetime_type" />
		dates[dates.length - 1].datetime_type
		{{ dates[dates.length - 1].datetime_type }}
		<FormKit type="date" label="timestamp_type" name="timestamp_type" />
	</FormKit>
</template>
<script setup>
	const { $dayjs } = useNuxtApp()

	//
	// Initialize Add form
	//
	let state = ref({})
	const dates = ref([])

	const { data, pending, error, refresh } = await useFetch('/atesting/getall', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})
	dates.value = data.value

	// Incoming

	//// wORKING ?
	// load up the form with last item in list
	// db set timezone = +00:00
	//// wORKING ? ///////////////////////////////////////
	//
	state.value.datetime_type = dates.value[dates.value.length - 1].datetime_type
	state.value.timestamp_type =
		dates.value[dates.value.length - 1].timestamp_type

	// Outgoing
	//
	const submitForm = async (state) => {
		// datetime_type is created by formkit date in 'YYYY-MM-DD'

		const { data, pending, error } = await useFetch('/atesting/addone', {
			method: 'post',
			body: state,
			headers: {
				authorization: 'not-needed',
			},
		})
		navigateTo('/atesting')
	}
</script>
