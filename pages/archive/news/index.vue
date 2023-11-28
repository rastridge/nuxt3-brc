<template>
	<div id="archive-news">
		<Head>
			<Title>News Archive </Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<common-header title="News Archive" />
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

		<div v-if="news" class="surface-400 p-2 border-round-lg border-1">
			<ul class="list-none text-sm md:text-lg">
				<li
					v-for="itm in filteredData"
					:key="itm.id"
					class="cursor-pointer text-500 bg-white border-round-lg p-3 m-2"
				>
					<a href="#" @click="openModal(itm)">
						<span class="text-sm md:text-lg text-600">{{
							$dayjs(itm.dt).format('YYYY MMM DD')
						}}</span>
						-
						<span class="text-sm md:text-lg text-600 font-semibold">{{
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
					{{ $dayjs(selectedItem.news_event_dt).format('MMM DD YYYY') }}
					{{ selectedItem.news_title }}
				</div></template
			>
			<div class="text-sm" v-html="selectedItem.news_article"></div>

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
	// Dialog initialization - display news item
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
		return news.value.filter((d) => {
			return parseInt($dayjs(d.dt).format('YYYY')) === year.value
		})
	})

	//
	// Get news
	//
	const {
		data: news,
		pending,
		error,
		refresh,
	} = await useFetch('/news/getallcurrent', {
		method: 'get',
	})
</script>
