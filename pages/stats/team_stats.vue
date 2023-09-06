<template>
	<div id="team_stats">
		<Head>
			<Title>Team Record</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<common-header title="Team Record" />
			</div>

			<div class="topsectionitem">
				<h6 class="text-xl">All Time</h6>
				<select-game-type
					:currenttype="gametype"
					@submitted="onSubmitGameType"
				/>
			</div>
			<div v-if="!data" class="topsectionitem">Loading ...</div>
		</div>
		<div class="mb-2" style="overflow-x: auto">
			<table class="nowrap">
				<thead>
					<tr>
						<th class="text-center">Games</th>
						<th class="text-center">Wins</th>
						<th class="text-center">Losses</th>
						<th class="text-center">Ties</th>
						<th class="text-center">Unknown</th>
						<th class="text-center">Win%</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="text-center">{{ total.game_count }}</td>
						<td class="text-center">{{ total.wins }}</td>
						<td class="text-center">{{ total.losses }}</td>
						<td class="text-center">{{ total.ties }}</td>
						<td class="text-center">{{ total.unknown }}</td>
						<td class="text-center">
							{{
								(
									(total.wins / (total.game_count - total.unknown)) *
									100
								).toFixed(0)
							}}
							%
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<DataTable
			:value="filteredData"
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
		>
			<!-- <DataTable :value="filteredData" paginator :rows="20"> -->
			<Column field="season" header="Season">
				<template #body="slotProps">
					<nuxt-link :to="`/games/schedule/${slotProps.data.year}`"
						><span class="text-lg">{{ slotProps.data.season }}</span>
					</nuxt-link>
				</template>
			</Column>
			<Column field="game_count" header="Games"></Column>
			<Column field="wins" header="Wins"></Column>
			<Column field="losses" header="Losses"></Column>
			<Column field="ties" header="Ties"></Column>
			<Column field="unknown" header="Unknown"></Column>
			<Column header="Win%">
				<template #body="slotProps">
					{{
						(
							(slotProps.data.wins /
								(slotProps.data.game_count - slotProps.data.unknown)) *
							100
						).toFixed(0)
					}}
					%
				</template></Column
			>
		</DataTable>
	</div>
</template>

<script setup>
	import dayjs from 'dayjs'
	const { $dayjs } = useNuxtApp()

	//
	// get / set season data
	//
	const gametype = ref(1)
	const onSubmitGameType = (value) => {
		gametype.value = value
	}

	const filteredData = computed(() => {
		return data.value.filter((d) => {
			if (gametype.value === 7) {
				return d.game_type_id === 7
			} else {
				return d.game_type_id !== 7
			}
		})
	})

	const url = `/game_player_stats/getteamstats/` + gametype.value
	const { data, pending, error } = await useFetch(url, {
		method: 'get',
		headers: {
			// authorization: auth.user.token,
			authorization: 'not-needed',
		},
	})

	const url2 = `/game_player_stats/getteamstatstotal/` + gametype.value
	const { data: total, error: error2 } = await useFetch(url2, {
		method: 'get',
		headers: {
			// authorization: auth.user.token,
			authorization: 'not-needed',
		},
	})

	if (error2.value) {
		throw createError({
			...error2.value,
			statusMessage: `Could not get data from ${url2}`,
		})
	}

	if (error.value) {
		throw createError({
			...error.value,
			statusMessage: `Could not get data from ${url}`,
		})
	}
</script>

<style scoped>
	table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid;
		padding: 1rem;
	}

	th,
	td {
		text-align: center;
		padding: 0.5rem;
	}
</style>
