<template>
	<div>
		<p class="font-semibold">Voted on {{ state.vote_vote_cnt }} times</p>
		choices[0] {{ choices[0] }}
		<p v-if="saving">
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
			Saving ...
		</p>
		<Button label="Cancel" @click.prevent="cancelForm()"> </Button>
		<!--  -->
		<FormKit type="list" v-model="values">
			<FormKit
				v-for="key in items"
				:key="key"
				:id="key"
				type="text"
				label="Choice"
				:sections-schema="{
					suffix: {
						$el: 'a',
						attrs: {
							class: '$classes.remove',
							'data-key': '$id',
							href: '#',
							onClick: removeItem,
						},
						children: 'Remove choice',
					},
				}"
			/>
			<hr />
		</FormKit>
		<Button class="primary" size="small" raised @click.prevent="addItem"
			>+ Add Choice</Button
		>
		<pre wrap>values {{ values }}</pre>
		<pre wrap>items {{ items }}</pre>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	// ///////////////////////////////////////////
	import { token } from '@formkit/utils'

	const values = ref([])

	// ///////////////////////////////////

	const auth = useAuthStore()
	const saving = ref(false)

	const { $dayjs } = useNuxtApp()
	//
	// Outgoing
	//
	const emit = defineEmits(['submitted'])
	//
	// Incoming
	//
	const props = defineProps({
		id: { Number, default: 0 },
	})

	//
	// Initialize Add form
	//
	let state = ref({})
	const choices = ref([])
	const items = ref([])

	const addItem = () => {
		values.value.push('')
		items.value.push(token())
	}
	const editItem = (item) => {
		values.value.push(item)
		items.value.push(token())
	}

	/* 	const addItem = (item) => {
		items.value.push(item)
	} */

	const removeItem = (e) => {
		e.preventDefault()
		const key = e.target.getAttribute('data-key')
		items.value = items.value.filter((item) => item !== key)
	}

	//
	// edit if there is an id - add if not
	//
	if (props.id !== 0) {
		//
		// Initialize Edit form
		//
		// get question
		const { data: question_data } = await useFetch(`/votes/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = question_data.value

		//
		// get choices
		const url = `/votes/getchoices/${props.id}`
		const { data: choices_data } = await useFetch(url, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		choices.value = choices_data.value

		// create list for formkit
		choices.value.forEach((item, index, array) => {
			if (item.vote_choice !== '') {
				editItem(item.vote_choice)
			}
			console.log(...items.value)
		})
	}
	//
	// form handlers
	//
	const submitForm = (state) => {
		state.id = props.id
		// state.choices = choices.value
		saving.value = true
		emit('submitted', state)
	}

	const cancelForm = () => {
		navigateTo('/admin/votes')
	}
</script>

<style>
	.formkit-remove {
		position: absolute;
		left: calc(100% + 0.5em);
		color: red;
		font-size: 0.75em;
	}
	button {
		align-self: flex-start;
	}
</style>
