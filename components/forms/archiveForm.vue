<template>
	<div>
		<div class="my-form-style"> <FormKit
			type="form"
			:config="{ validationVisibility: 'live' }"
			v-model="state"
			submit-label="Submit"
			@submit="submitForm(state)"
		>
			<FormKit
				label="Archive Title"
				name="archive_title"
				type="text"
				validation="required"
			/>
			<FormKit
				label="Description"
				name="archive_description"
				type="textarea"
				validation="required"
			/>
			<FormKit label="Category" name="archive_category" type="text" />
			<h5>PDF file</h5>
			<h6>File {{ state.archive_filepath }}</h6>
			<FileUpload
				class="mb-4"
				mode="basic"
				name="fileInput"
				:auto="true"
				accept="application/pdf"
				customUpload
				@uploader="submitFileUpload"
			/>
			<FormKit
				type="date"
				label="Document Date"
				name="archive_date"
				validation="required"
			/>
		</FormKit>
		<p v-if="saving">
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
			Saving ...
		</p>
		<Button label="Cancel" @click.prevent="cancelForm()"> </Button>

		<!-- Modal -->
		<Dialog
			v-model:visible="displayModal"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
			:style="{ width: '50vw' }"
		>
			<template #header>
				<div class="my-dialog-header">
					<h3>Processing file</h3>
				</div></template
			>
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
		</Dialog>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()

	const saving = ref(false)

	const { $dayjs } = useNuxtApp()
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
	const fileInput = ref(null)

	//
	// Initialize Add form
	//
	let state = ref({})
	//
	// edit if there is an id - add if not
	//
	if (props.id !== 0) {
		//
		// Initialize Edit form
		//
		const {
			data: archive_data,
			pending,
			error,
			refresh,
		} = await useFetch(`/archive/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = archive_data.value

		// Format for Primevue calendar / neessary?
		state.value.archive_date = $dayjs(archive_data.value.archive_date).format(
			'YYYY-MM-DD'
		)
	}

	//
	// progress modal
	//
	const displayModal = ref(false)
	const openProgressModal = () => {
		displayModal.value = true
	}
	const closeProgressModal = () => {
		displayModal.value = false
	}

	const submitFileUpload = async (event) => {
		const file = event.files[0]

		const formData = new FormData()
		formData.append('file', file)
		openProgressModal()
		// Find server code in folder Nuxt3-brc-media-api
		const url = `https://media.buffalorugby.org/images/archives`
		const res = await fetch(url, {
			method: 'POST',
			body: formData,
			headers: {
				authorization: auth.user.token,
			},
		})

		const data = await res.json()
		closeProgressModal()
		state.value.archive_filepath = data.imageUrl
	}
	//
	// form handlers
	//
	const submitForm = async (state) => {
		saving.value = true

		emit('submitted', state)
	}

	const cancelForm = () => {
		navigateTo('/admin/archive') // needs to be / for self register
	}
</script>
