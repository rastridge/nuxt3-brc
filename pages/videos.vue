<template>
	<div id="videos">
		<div
			v-if="videos.length"
			class="surface-400 pt-3 pb-3 border-round-lg border-1"
		>
			<ul class="list-none text-xl">
				<li
					v-for="itm in videos"
					:key="itm.video_id"
					class="cursor-pointer bg-white border-1 p-3 m-2"
					href="#"
					@click.prevent="selectItem(itm)"
				>
					<span class="font-italic">
						{{ $dayjs(itm.video_event_dt).format('YYYY MMM') }}
					</span>
					|
					<span class="font-semibold">
						{{ itm.video_title }}
					</span>
					|
					<span class="text-lg">
						{{ itm.video_synop }}
					</span>
				</li>
			</ul>
		</div>
		<!-- Modal -->
		<Dialog
			v-model:visible="displayModal"
			:breakpoints="{ '900px': '75vw', '640px': '90vw' }"
			:style="{ width: '50vw' }"
		>
			<div>
				<!-- <div class="embed-responsive embed-responsive-16by9"> -->
				<iframe
					width="560"
					height="315"
					:src="video_url"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
				<!-- </div> -->
			</div>
		</Dialog>
	</div>
</template>

<script setup>
	import { getIdFromURL } from 'vue-youtube-embed'
	const { $dayjs } = useNuxtApp()

	const item = ref({})
	const video_url = ref('')
	//
	// Get current videos
	//
	const {
		data: videos,
		pending,
		error,
		refresh,
	} = await useFetch('/videos/getallcurrent', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})

	const selectItem = (item) => getOne(item.id)

	const getOne = async (id) => {
		const { data, pending, error, refresh } = await useFetch('/videos/' + id, {
			method: 'get',
			headers: {
				authorization: 'not-needed',
			},
		})

		item.value = data.value
		if (item.value.video_url.includes('yout')) {
			video_url.value =
				'https://www.youtube.com/embed/' + getIdFromURL(item.value.video_url)
			openModal()
		} else {
			const url = item.value.video_url
			window.open(url)
		}
	}

	//
	// video modal
	//
	const displayModal = ref(false)
	const openModal = () => {
		displayModal.value = true
	}
	const closeModal = () => {
		displayModal.value = false
	}
</script>
