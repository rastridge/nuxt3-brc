<template>
	<div id="documents">
		<div
			v-if="archives.length"
			class="surface-400 pt-3 pb-3 border-round-lg border-1"
		>
			<ul class="list-none text-xl">
				<li
					v-for="itm in archives"
					:key="itm.id"
					class="cursor-pointer bg-white border-1 p-3 m-2"
				>
					<span class="font-italic">
						{{ $dayjs(itm.archive_date).format('YYYY MMM') }}
					</span>
					|
					<span class="font-semibold">
						{{ itm.archive_title }}
					</span>
					|
					<span class="text-lg">
						{{ itm.archive_description }}
					</span>
					|

					<!-- <a :href="itm.archive_filepath" target="blank">READ</a> -->
					<button @click="openModal(itm.archive_filepath)">Display PDF</button>
					<span>{{ itm.archive_filepath }}</span>
				</li>
			</ul>
		</div>
		<!-- Modal -->
		<Dialog
			v-model:visible="displayModal"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
			:style="{ width: '50vw' }"
		>
			<display-pdf :src="source" />
		</Dialog>
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()

	const source = ref('')
	//
	// Get current archives
	//
	const {
		data: archives,
		pending,
		error,
		refresh,
	} = await useFetch('/archive/getallcurrent', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})

	//
	// progress modal
	//
	const displayModal = ref(false)
	const openModal = (s) => {
		console.log('IN openmodal s = ', s)
		source.value = s
		console.log('IN openmodal source.value = ', source.value)

		displayModal.value = true
	}
	const closeModal = () => {
		displayModal.value = false
	}
</script>
