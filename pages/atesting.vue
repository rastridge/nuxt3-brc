<template>
	<table>
		<tr>
			<th>format()</th>
			<th>format('YYYY-MM-DD HH:mm:ss')</th>
		</tr>
		<tr>
			<td>
				{{ $dayjs(dates[dates.length - 1].datetime_type).format() }}
			</td>
			<td>
				{{
					$dayjs(dates[dates.length - 1].datetime_type).format(
						'YYYY-MM-DD HH:mm:ss'
					)
				}}
			</td>
		</tr>
	</table>
	<p>Form contains last value</p>
	<FormKit
		type="form"
		:config="{ validationVisibility: 'live' }"
		v-model="state"
		submit-label="Submit"
		@submit="submitForm(state)"
	>
		<FormKit type="date" label="datetime_type" name="datetime_type" />
		state.datetime_type
		{{ state.datetime_type }}
		<FormKit type="time" label="time" name="time" />
		state.time
		{{ state.time }}
		{{ $dayjs(dates[dates.length - 1].datetime_type).format('HH:mm') }}
	</FormKit>
</template>

<script setup>
	/* 
WORKING

IN DB connection - set timezone = +00:00
SUBMIT AS UTC - state.datetime_type = $dayjs.utc(state.datetime_type + state.time).format()
RETRIEVE AS LOCAL - 	state.value.datetime_type = $dayjs(dates.value[dates.value.length - 1].datetime_type).format(
		'YYYY-MM-DD'
	)
*/
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
	state.value.datetime_type = $dayjs(
		dates.value[dates.value.length - 1].datetime_type
	).format('YYYY-MM-DD')

	state.value.time = $dayjs(
		dates.value[dates.value.length - 1].datetime_type
	).format('HH:mm')

	// Outgoing
	//
	const submitForm = async (state) => {
		// datetime_type is created by formkit date in 'YYYY-MM-DD'

		state.datetime_type = $dayjs.utc(state.datetime_type + state.time).format()

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
