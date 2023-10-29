<template>
	<div id="schedule">
		<Head>
			<Title>Schedule ad Results</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<common-header title="Game Schedule and Results" />
			</div>
			<div class="topsectionitem">
				<select-season
					:startyear="startyear"
					:currentyear="year"
					@submitted="onSubmit"
					class="mb-3"
				/>

				<select-game-type
					:currenttype="gametype"
					@submitted="onSubmitGameType"
				/>
			</div>
		</div>
		<DataView
			:value="filteredData"
			:pt="{
				root: {
					style: {
						padding: '0.5rem',
						minWidth: '10rem',
						border: '2px #00C solid',
						'border-radius': '10px',
					},
				},
			}"
		>
			<template #list="slotProps">
				<div class="col-12">
					<div
						class="flex flex-column md:flex-row justify-content-between align-items-center xl:align-items-center gap-2 mb-2 p-3 border-round-md shadow-4 bg-blue-600 text-white font-semibold"
					>
						<!-- left -->
						<div
							class="flex flex-row justify-content-center md:flex-column align-items-center md:align-items-start gap-3 border-soli w-full md:w-3"
						>
							<div class="flex align-items-center border-soli">
								<span class="lg:text-xl font-bold text-900">
									{{
										$dayjs
											.unix(slotProps.data.date_ut)
											.format('ddd MMMM D YYYY')
									}}<br />
									{{ $dayjs.unix(slotProps.data.date_ut).format('h:mm A') }} EDT
									<br />
								</span>
							</div>

							<div class="flex align-items-center border-soli">
								<span class="font-semibold"
									>{{ getGameLevelCode(slotProps.data) }} Side
								</span>
							</div>

							<div class="flex align-items-center border-soli">
								<span class="font-semibold">{{
									slotProps.data.game_type
								}}</span>
							</div>
						</div>

						<!-- centered stuff-->
						<div
							class="flex flex-column align-items-center gap-1 border-soli w-full md:w-6"
						>
							<div class="flex align-items-center border-soli">
								<Button
									:label="slotProps.data.title"
									text
									class="text-3xl text-300 font-bold"
									@click.prevent="showGame(slotProps.data.game_id)"
								>
								</Button>
							</div>
							<div class="flex align-items-center border-soli">
								<span class="text-2xl font-semibold">
									{{ getResultCode(slotProps.data) }} &nbsp;&nbsp;&nbsp;
									{{ slotProps.data.ptsFor }} -
									{{ slotProps.data.ptsAgn }}</span
								>
							</div>
						</div>

						<!-- right aligned stuff -->
						<div
							class="flex flex-row justify-content-center md:flex-column align-items-center md:align-items-start gap-2 border-soli w-full md:w-3"
						>
							<div class="flex align-items-center gap-3 border-soli">
								<span class="md:text-xl font-semibold"
									>@ {{ slotProps.data.venue }}</span
								>
							</div>
							<div class="flex align-items-center border-soli">
								<span>
									{{ slotProps.data.occasion }}
								</span>
							</div>
							<div class="flex align-items-center border-soli">
								<Button
									label="Show history"
									class="text-300"
									link
									size="small"
									@click="showHistory(slotProps.data.opponent_id)"
								>
								</Button>
								<span class="text-sm text-800">
									{{ slotProps.data.game_id }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</template>
		</DataView>
		<roster-chart />

		<!-- Game Modal -->
		<Dialog
			v-model:visible="displayGameModal"
			:breakpoints="{ '900px': '75vw', '640px': '90vw' }"
			:style="{ width: '60vw' }"
			:pt="{
				root: { class: 'border-round-3xl border-3' },
				header: { class: 'surface-300' },
				content: {
					class: 'text-xs md:text-lg border-1 p-2',
				},
				footer: { class: 'surface-300' },
			}"
			maximizable
			modal
		>
			<div class="m-1 p-1 text-sm">
				<display-game-info :item="info" />
				<display-roster :players="players" />
			</div>
			<template #footer>
				<div>
					<Button
						label="Close"
						@click="closeModal"
						class="p-button-sm mt-2"
						autofocus
					/>
				</div>
			</template>
		</Dialog>

		<!-- History Modal -->
		<Dialog
			v-model:visible="displayHistoryModal"
			:breakpoints="{ '900px': '75vw', '640px': '90vw' }"
			:pt="{
				root: { class: 'w-12 sm:w-10 md:w-8' },
				header: { class: 'surface-300' },
				content: {
					class: 'text-xs md:text-lg border-1 p-2',
				},
				footer: { class: 'surface-300' },
			}"
		>
			<div class="m-1 p-1 text-sm">
				<display-history :opponent_id="opponent_id" />
				<display-records :opponent_id="opponent_id" />
				<display-streaks :opponent_id="opponent_id" />
			</div>
			<template #footer>
				<div>
					<Button
						label="Close"
						@click="closeHistoryModal"
						class="p-button-sm mt-2"
						autofocus
					/>
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	import dayjs from 'dayjs'
	const { $dayjs } = useNuxtApp()

	const { getGameLevelCode, getResultCode } = useGames()

	//
	// Initialize year select
	//
	const startyear = 1966
	const year = ref(parseInt($dayjs().format('YYYY')))

	//
	// get / set season data
	//
	const season = ref([])
	const getSeason = async (year) => {
		const url = `/game_player_stats/getseason/${year}`
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
		}

		// date and time from unix time
		// data.value.date_ut
		data.value.combined = $dayjs.unix(data.value.date_ut)
		return data.value
	}

	season.value = await getSeason(year.value)

	//
	// set gametype after drop down choice
	//
	const gametype = ref(1)
	const onSubmitGameType = (value) => {
		gametype.value = value
	}
	//
	// get season
	//
	const onSubmit = async (value) => {
		year.value = value
		season.value = await getSeason(year.value)
	}

	const filteredData = computed(() => {
		return season.value.filter((d) => {
			if (gametype.value === 7) {
				return d.game_type_id === 7
			} else {
				return d.game_type_id !== 7
			}
		})
	})

	//
	// game modal
	//

	const info = ref(null)
	const players = ref(null)
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
			info.value = data.value
		}
	}
	const displayGameModal = ref(false)
	const openModal = () => {
		displayGameModal.value = true
	}
	const closeModal = () => {
		displayGameModal.value = false
	}
	const showGame = async (id) => {
		// placemark.setYear(year.value)
		// navigateTo(`/schedule/game/${id}`)
		//get game info
		await getOne(id)
		await getPlayers(id)
		openModal()
	}
	//
	// history modal
	//
	const opponent_id = ref(null)
	const displayHistoryModal = ref(false)

	const openHistoryModal = () => {
		displayHistoryModal.value = true
	}
	const closeHistoryModal = () => {
		displayHistoryModal.value = false
	}
	const showHistory = (id) => {
		opponent_id.value = id
		openHistoryModal()
	}
</script>

<style scoped></style>
