<template>
	<div id="player-history"></div>
	<CommonHeader title="Player game history" />
	<Card style="width: 20em; margin-bottom: 1rem">
		<template #title> Player name</template>
		<template #content>
			<AutoComplete
				v-model="selectedItem"
				optionLabel="title"
				:suggestions="filteredNames"
				@complete="search"
				@item-select="getHistory"
			/>
		</template>
	</Card>

	<DataTable
		:value="history"
		dataKey="account_id"
		v-model:filters="filters"
		:globalFilterFields="['opponent_name']"
		:class="'p-datatable-sm'"
		stripedRows
		filterDisplay="row"
		paginator
		:rows="20"
		:rowsPerPageOptions="[5, 10, 20, 50]"
		paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
		currentPageReportTemplate="{first} to {last} of {totalRecords}"
		selectionMode="single"
	>
		<template #empty> No members found. </template>
		<template #loading> Loading Membership data. Please wait. </template>
		<Column
			header="Date"
			field="date"
			:showFilterMenu="true"
			style="width: 10rem"
		>
			<template #body="{ data }">
				<span class="text-sm md:text-lg">{{
					$dayjs(data.date).format('MMM DD YYYY')
				}}</span>
			</template>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					@input="filterCallback()"
					class="p-column-filter"
					placeholder="Search by date"
				/>
			</template>
		</Column>
		<Column
			header="Opponent"
			field="opponent_name"
			:showFilterMenu="true"
			style="width: 25rem"
		>
			<template #body="{ data }">
				<Button link @click="openGameModal(data.game_id)">
					<span class="text-sm md:text-lg">{{ data.opponent_name }}</span>
				</Button>
			</template>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					@input="filterCallback()"
					class="p-column-filter"
					placeholder="Search by opponent"
				/>
			</template>
		</Column>
		<Column
			header="Venue"
			field="venue"
			:showFilterMenu="true"
			style="width: 20rem"
		>
			<template #body="{ data }">
				<span class="text-sm md:text-lg">{{ data.venue }}</span>
			</template>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					@input="filterCallback()"
					class="p-column-filter"
					placeholder="Search by venue"
				/>
			</template>
		</Column>
		<Column
			header="Occasion"
			field="occasion"
			:showFilterMenu="true"
			style="width: 20rem"
		>
			<template #body="{ data }">
				<span class="text-sm md:text-lg">{{ data.occasion }}</span>
			</template>
		</Column>
		<Column
			header="Level"
			field="game_level"
			:showFilterMenu="true"
			style="width: 10rem"
		>
			<template #body="{ data }">
				<span class="text-sm md:text-lg">{{ data.game_level }}</span>
			</template>
		</Column>
		<Column
			header="Type"
			field="game_type"
			:showFilterMenu="true"
			style="width: 10rem"
		>
			<template #body="{ data }">
				<span class="text-sm md:text-lg">{{ data.game_type }}</span>
			</template>
		</Column>
	</DataTable>

	<!-- Modal -->
	<Dialog
		v-model:visible="displayModal"
		:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
		:style="{ width: '60vw' }"
	>
		<display-game-info :item="game" />
		<display-roster :players="players" />
		<template #footer>
			<div>
				<Button
					label="Return"
					@click="closeModal"
					class="p-button-sm"
					autofocus
				/>
			</div>
		</template>
	</Dialog>
</template>

<script setup>
	import { FilterMatchMode } from 'primevue/api'

	//
	// for datatable
	//
	const history = ref([])
	const filters = ref({
		opponent_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
		date: { value: null, matchMode: FilterMatchMode.CONTAINS },
		venue: { value: null, matchMode: FilterMatchMode.CONTAINS },
	})
	const { $dayjs } = useNuxtApp()

	//
	// stuff for modal
	//
	const game = ref({})
	const players = ref([])

	const displayModal = ref(false)
	const openModal = () => {
		displayModal.value = true
	}
	const closeModal = () => {
		displayModal.value = false
	}
	const openGameModal = async (id) => {
		console.log(id)
		await getOne(id) // get game info
		await getPlayers(id) // get game info for players
		openModal()
	}
	const getPlayers = async (game_id) => {
		const url = `/game_player_stats/players/${game_id}`
		const { data, error } = await useFetch(url, {
			method: 'get',
			headers: {
				// authorization: auth.user.token,
				authorization: 'not-needed',
			},
		})
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Could not get data from ${url}`,
			})
		} else {
			players.value = data.value
		}
	}
	const getOne = async (id) => {
		const url = `/game_player_stats/${id}`
		const { data, error } = await useFetch(url, {
			method: 'get',
			headers: {
				// authorization: auth.user.token,
				authorization: 'not-needed',
			},
		})
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Could not get data from ${url}`,
			})
		} else {
			game.value = data.value
		}
	}
	//
	// get stuff for autocomplete
	//
	const selectedItem = ref('')
	const filteredNames = ref([])
	const { data: suggestions } = await useFetch(`/accounts/suggestions`, {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})
	const search = (event) => {
		if (!event.query.trim().length) {
			filteredNames.value = [...suggestions.value]
		} else {
			filteredNames.value = suggestions.value.filter((suggestion) => {
				return (
					suggestion.title
						.toLowerCase()
						// .startsWith(event.query.toLowerCase())
						.includes(event.query.toLowerCase())
				)
			})
		}
	}

	//
	// Get player game history
	//
	const getHistory = async () => {
		const { data, pending, error, refresh } = await useFetch(
			`/game_player_stats/getplayergames/${selectedItem.value.account_id}`,
			{
				method: 'get',
				headers: {
					authorization: 'not-needed',
				},
			}
		)
		history.value = data.value
	}
</script>
