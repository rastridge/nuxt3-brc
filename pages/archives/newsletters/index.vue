<template>
	<div id="archive-newsletter">
		<Head>
			<Title>Buffalo Rugby Club Newsletters Archive </Title>
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
		<div class="my-simple-card-style">
			<ul class="list-none text-sm md:text-lg">
				<li
					v-for="itm in year_data"
					:key="itm.id"
					class="cursor-pointer text-500 font-semibold bg-white border-1 border-round-lg p-3 m-2"
				>
					<a href="#" @click="openModal(itm)">
						<span class="text-sm md:text-lg text-600">{{
							$dayjs(itm.sent_dt).format('LL')
						}}</span>
						-
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
			:style="{ width: '60vw' }"
			:pt="{
				root: {
					style: {
						padding: '0.5rem',
						minWidth: '10rem',
						border: '2px #00C solid',
						'border-radius': '10px',
						'background-color': 'white',
					},
				},
				header: {
					style: {
						'border-bottom': 'solid 1px black',
					},
				},
				footer: {
					style: {
						'border-top': 'solid 1px black',
					},
				},
			}"
		>
			<template #header>
				<div class="font-semibold text-md lg:text-lg">
					{{ $dayjs(selectedItem.newsletter_sent).format('LL') }} -
					{{ selectedItem.newsletter_subject }}
				</div></template
			>
			<div class="text-sm" v-html="selectedItem.newsletter_body_html"></div>

			<template #footer>
				<div>
					<Button
						label="Return"
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
	const error = ref('')
	//
	// Select year
	//
	const { $dayjs } = useNuxtApp()
	const year = ref(parseInt($dayjs().format('YYYY')))
	const startyear = 2004

	const onSubmit = (value) => {
		year.value = value
	}

	//
	// get year data for list
	//
	const year_data = ref([])

	const getYearOfNewsletters = async (year) => {
		const { data, pending, error, refresh } = await useFetch(
			`/newsletters/year/${year}`,
			{
				method: 'get',
			}
		)
		year_data.value = data.value
		error.value = error
	}
	// getYearOfNewsletters(year.value)
	// get newsletters when  year changes
	watchEffect(() => getYearOfNewsletters(year.value))

	//
	// Dialog to display newsletters item
	//
	const selectedItem = ref({})
	const displayModal = ref(false)
	const openModal = async (item) => {
		await getOne(item.id)
		displayModal.value = true
	}
	const closeModal = () => {
		displayModal.value = false
	}
	// get one for Modal
	const getOne = async (id) => {
		const { data } = await useFetch(`/newsletters/${id}`, {
			method: 'get',
		})
		selectedItem.value = data.value
	}
</script>
