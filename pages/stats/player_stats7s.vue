<template>
	<div id="player-stats">
		<Common-header title="7s Players" />
		<div class="card">
			<DataTable
				:value="data"
				dataKey="name"
				v-model:filters="filters"
				:globalFilterFields="['member_type']"
				:class="'p-datatable-sm'"
				:pt="{
					wrapper: {
						style: {
							padding: '0.5rem',
							minWidth: '10rem',
							border: '2px #00C solid',
							'border-radius': '10px',
						},
					},
				}"
				stripedRows
				filterDisplay="row"
				paginator
				:rows="20"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
				currentPageReportTemplate="{first} to {last} of {totalRecords}"
				selectionMode="single"
			>
				<template #empty> No players found. </template>
				<template #loading> Loading player data. Please wait. </template>

				<Column
					header="Name"
					field="name"
					:showFilterMenu="false"
					style="width: 20rem"
				>
					<template #body="{ data }">
						{{ data.name }}
					</template>
					<template #filter="{ filterModel, filterCallback }">
						<InputText
							v-model="filterModel.value"
							type="text"
							@input="filterCallback()"
							class="p-column-filter"
							placeholder="Search by name"
						/>
					</template>
				</Column>
				<Column
					field="year"
					header="Joined"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
					<template #filter="{ filterModel, filterCallback }">
						<InputText
							v-model="filterModel.value"
							type="text"
							@input="filterCallback()"
							class="p-column-filter"
							placeholder="Search by year"
						/>
					</template>
				</Column>

				<Column
					field="member_type"
					header="Member Type"
					:showFilterMenu="false"
				>
					<template #filter="{ filterModel, filterCallback }">
						<Dropdown
							v-model="filterModel.value"
							@change="filterCallback()"
							:options="member_types"
							placeholder="Search by member type"
							:showClear="true"
							style="width: 10rem"
						>
						</Dropdown>
					</template>
				</Column>
				<Column
					field="games"
					header="Games"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>
				<Column
					field="tries"
					header="Tries"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>
				<Column
					field="maxtries"
					header="Most/g"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>
				<Column
					field="tpg"
					header="Tries/g"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>
				<Column
					field="conv"
					header="Convs"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>
				<Column
					field="maxconv"
					header="Most/g"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>
				<Column
					field="pk"
					header="PenKicks"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>
				<Column
					field="maxpk"
					header="Most/g"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>

				<Column
					field="yellow"
					header="Yellow"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>
				<Column
					field="red"
					header="Red"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>

				<Column
					field="pts"
					header="Pts"
					:showFilterMenu="false"
					sortable
					style="width: 10rem"
				>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<script setup>
	import { FilterMatchMode } from 'primevue/api'

	//
	// Get current news
	//
	const { data, pending, error, refresh } = await useFetch(
		'/game_player_stats/getplayerstats/7',
		{
			// 1 = sevens
			method: 'get',
			headers: {
				authorization: 'not-needed',
			},
		}
	)

	//
	// filter value criteria
	//
	const filters = ref({
		name: { value: null, matchMode: FilterMatchMode.CONTAINS },
		year: { value: null, matchMode: FilterMatchMode.EQUALS },
		member_type: { value: null, matchMode: FilterMatchMode.EQUALS },
	})

	const member_types = ref([
		'Alumni',
		'Active',
		'Other',
		'Development',
		'Ad_Astra',
	])
</script>
