<template>
	<div class="my-form-style">
		<FormKit
			type="form"
			:config="{ validationVisibility: 'live' }"
			v-model="state"
			submit-label="Submit member"
			@submit="submitForm"
		>
			<display-alert />

			<FormKit
				label="First Name"
				name="member_firstname"
				type="text"
				validation="required"
			/>

			<FormKit
				label="Last Name"
				name="member_lastname"
				type="text"
				validation="required"
			/>
			<FormKit
				type="number"
				label="Year joined the BRC"
				name="member_year"
				min="1966"
				step="1"
				validation="required"
			/>
			<FormKit
				label="Previous club(s)"
				name="member_prev_club"
				type="text"
				validation="required"
			/>
			<FormKit
				type="email"
				label="Email address"
				name="account_email"
				validation="required|email"
			/>

			<FormKit
				type="text"
				label="Street"
				name="account_addr_street"
				validation="required"
			/>
			<FormKit type="text" label="Street Ext" name="account_addr_street_ext" />
			<FormKit
				type="text"
				label="City"
				name="account_addr_city"
				validation="required"
			/>
			<FormKit
				type="select"
				label="Country"
				name="account_addr_country"
				id="account_addr_country"
				:options="justCountries"
				validation="required"
			/>
			<FormKit
				type="select"
				label="Region"
				name="account_addr_state"
				id="account_addr_state"
				:options="justRegions"
				validation="required"
			/>
			<FormKit
				type="text"
				label="Postal Code"
				name="account_addr_postal"
				validation="required"
			/>
			<FormKit
				type="tel"
				label="Phone number"
				name="account_addr_phone"
				placeholder="+1##########"
				validation="required | matches:/^\+[1]{1}[0-9]{3}[0-9]{3}[0-9]{4}$/"
				:validation-messages="{
					matches: 'US/CA only. Must be in the format +1#########',
				}"
				validation-visibility="live"
			/>
			<display-alert />
			<display-cancelform />
		</FormKit>
		<p v-if="saving">
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
			Saving ...
		</p>
	</div>
</template>

<script setup>
	import { getNode } from '@formkit/core'
	const { getCountries, setRegions } = useLocations()
	const saving = ref(false)
	const state = ref(null)

	//
	// Outgoing
	//
	const emit = defineEmits(['submitted'])
	//
	// Incoming
	//
	const props = defineProps({
		id: { Number, default: 0 },
	})

	//
	// Initialize Edit form
	//
	const {
		data: formdata,
		pending,
		error,
		refresh,
	} = await useFetch(`/accounts/${props.id}`, {
		key: props.id,
		method: 'get',
	})
	state.value = formdata.value
	//
	// create coutry and region options formatted for Formkit
	const justCountries = ref(getCountries())
	// justCountries.value = getCountries()

	const justRegions = ref(setRegions(state.value.account_addr_country))
	// set regions for initial country
	// justRegions.value = setRegions(state.value.account_addr_country)

	//
	// progress modal
	//
	const displayModal = ref(true)
	// const openProgressModal = () => {
	// 	displayModal.value = true
	// }
	const closeModal = () => {
		displayModal.value = false
	}

	//
	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}

	// FormKit stuff
	// Region depends on country
	onMounted(() => {
		// Use the IDs of the inputs you want to get
		const countryNode = getNode('account_addr_country')
		const stateNode = getNode('account_addr_state')

		// Here we are listening for the 'commit' event
		countryNode.on('commit', ({ payload }) => {
			// We update the value of the regions
			justRegions.value = setRegions(payload)
		})
	})
</script>
