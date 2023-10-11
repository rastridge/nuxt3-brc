<template>
	<div id="archive-newsletter">
		<Head>
			<Title>Newsletters Archive </Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<common-header title="Newsletters Archive" />
			</div>
			<div class="topsectionitem">
				<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
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

		<div v-if="newsletters" class="surface-400 p-2 border-round-lg border-1">
			<ul class="list-none text-sm md:text-lg">
				<li
					v-for="itm in filteredData"
					:key="itm.id"
					class="cursor-pointer text-500 bg-white border-round-lg p-3 m-2"
				>
					<a href="#" @click="openModal(itm)">
						<span class="text-sm md:text-lg text-600">{{
							$dayjs(itm.sent_dt).format('YYYY MMM DD')
						}}</span>
						- -
						<span class="text-sm md:text-lg text-500 font-semibold">{{
							itm.title
						}}</span>
						<span class="text-xs md:text-sm text-blue-600 cursor-pointer">
							- Open</span
						>
					</a>
				</li>
			</ul>
		</div>
		<!-- </div> -->

		<!-- Modal -->
		<Dialog
			v-model:visible="displayModal"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
			:pt="{
				root: { class: 'border-round-3xl border-3' },
				header: { class: 'surface-300' },
				content: {
					class: 'text-xs md:text-lg border-1 p-6',
				},
				footer: { class: 'surface-300' },
			}"
			maximizable
			modal
		>
			<template #header>
				<div>
					{{ $dayjs(selectedItem.sent_dt).format('MMM DD YYYY') }} ---
					{{ selectedItem.title }}
				</div></template
			>
			<div class="text-sm" v-html="selectedItem.newsletter_body_html"></div>

			<template #footer>
				<div>
					<Button
						label="Close"
						@click="closeModal"
						class="p-button-sm m-2"
						autofocus
					/>
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()

	//
	// Dialog initialization - display newsletters item
	//
	const selectedItem = ref({})
	const displayModal = ref(false)
	const openModal = (item) => {
		displayModal.value = true
		selectedItem.value = item
	}
	const closeModal = () => {
		displayModal.value = false
	}

	//
	// Filter by year
	//
	const year = ref(parseInt($dayjs().format('YYYY')))
	const startyear = 2004

	const onSubmit = (value) => {
		year.value = value
	}

	const filteredData = computed(() => {
		return newsletters.value.filter((d) => {
			return parseInt($dayjs(d.dt).format('YYYY')) === year.value
		})
	})

	//
	// Get newsletters
	//
	const {
		data: newsletters,
		pending,
		error,
		refresh,
	} = await useFetch('/newsletters/getall', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})
</script>
