<template>
	<div id="clubhouse">
		<div class="text-center">
			<common-header title="Virtual Clubhouse" />
			<button @click="returnToList()">Return to Main Room</button>
		</div>
		clubhouse_category {{ clubhouse_category }} wofdata[0] {{ wofdata[0] }}
		<div class="bg">
			<div v-if="wofdata">
				<div v-for="item in wofdata" :key="item.id" class="card wof-card">
					<div class="card-header">{{ item.member_wall_of_fame_year }}</div>
					<div class="card-body">
						<!-- <div
							class="flex flex-wrap align-items-center justify-content-center"
						> -->
						<img class="wof-img" :src="item.member_pic_path" />
					</div>
					<!-- </div> -->
					<div class="card-footer">{{ item.name }}</div>
				</div>
			</div>
		</div>
		<!-- 		
			<div v-if="otherdata.length" class="bg">
				<div v-for="item in filteredData" :key="item.id" class="card my-card">
					<b-img-lazy :src="item.clubhouse_filepath" fluid> </b-img-lazy>
					<div class="card-body">
						<h5 class="card-title caption">{{ item.clubhouse_description }}</h5>
					</div>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script setup>
	useHead({
		title: 'Buffalo Rugby Clubhouse',
	})
	//
	// Get account id to edit
	//
	const route = useRoute()
	const clubhouse_category = ref(route.params.room)

	const otherdata = ref(null)
	const wofdata = ref(null)

	onMounted(() => {
		getAll()
	})
	/* 
	const filteredData = computed(() => {
		data.value.filter((d) => d.clubhouse_category === clubhouse_category.value)
	})	
	const returnToList = () => {
		navigateTo('/clubhouse')
	}
 */
	const getAll = async () => {
		if (clubhouse_category.value !== 'wof') {
			const { data, pending, error, refresh } = await useFetch(
				`/clubhouse/getall`,
				{
					method: 'get',
					headers: {
						authorization: 'not-needed',
					},
				}
			)
			otherdata.value = data.value
		} else {
			const { data, pending, error, refresh } = await useFetch(
				`/accounts/getwof`,
				{
					method: 'get',
					headers: {
						authorization: 'not-needed',
					},
				}
			)
			wofdata.value = data.value
		}
	}
</script>

<style scoped>
	.my-card {
		background: transparent;
		margin: 1rem;
		display: inline-block;
	}
	.bg {
		background-image: url('/_img/_backgrounds/wood_clubhouse.jpg');
		/* Center and scale the image nicely */
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		padding: 2em;
	}
	.caption {
		background-image: url('/_img/_backgrounds/bronze.jpg');
		/* Center and scale the image nicely */
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		text-align: center;
		padding: 0.5em;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		font-size: small;
	}
	.wof-card {
		text-align: center;
		width: 160px;
		display: inline-block;
		margin: 1rem;
		background: #b6b6b6;
		-webkit-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
		box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	}
	.wof-img {
		height: 72px;
		width: 72px;
		border: solid thick black;
	}
</style>
