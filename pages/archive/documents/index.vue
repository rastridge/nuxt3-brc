<template>
	<div id="documents">
		<Head>
			<Title>Document Archive </Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<common-header title="Document Archive" />
			</div>
			<div class="topsectionitem">
				<select-year
					:startyear="startyear"
					:currentyear="year"
					@submitted="onSubmit"
					class="mb-3"
				/>
			</div>
		</div>
		<div
			v-if="archives.length"
			class="surface-400 pt-3 pb-3 border-round-lg border-1"
		>
			<ul class="list-none text-xl">
				<li
					v-for="itm in filteredData"
					:key="itm.id"
					class="cursor-pointer bg-white border-1 p-3 m-2"
				>
					<a :href="itm.archive_filepath" target="blank">
						<span class="font-italic">
							{{ $dayjs(itm.archive_date).format('YYYY MMM') }}
						</span>
						-
						<span class="font-semibold">
							{{ itm.archive_title }}
						</span>
						<br />
						<span class="text-lg">
							{{ itm.archive_description }}
						</span>
					</a>
					<!-- 					<button @click="openModal(itm.archive_filepath)">Display PDF</button>
					<span>{{ itm.archive_filepath }}</span> -->
				</li>
			</ul>
		</div>

		<!-- Modal -->
		<!-- 		<Dialog
			v-model:visible="displayModal"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
			:style="{ width: '50vw' }"
		>
			<display-pdf :src="source" />
		</Dialog> -->
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()

	// initial values
	const year = ref(parseInt($dayjs().format('YYYY')))
	const startyear = 1966

	const filteredData = computed(() => {
		return archives.value.filter((d) => {
			return parseInt($dayjs(d.dt).format('YYYY')) === year.value
		})
	})
	const onSubmit = (value) => {
		year.value = value
	}

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
	/* 	const displayModal = ref(false)
	const openModal = (s) => {
		console.log('IN openmodal s = ', s)
		source.value = s
		console.log('IN openmodal source.value = ', source.value)

		displayModal.value = true
	}
	const closeModal = () => {
		displayModal.value = false
	} */
</script>
