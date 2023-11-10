<template>
	<div>
		<div v-if="props.id !== 0">
			<p class="font-semibold text-red-500">
				Do not edit after voting has begun!
			</p>
			<p class="font-semibold text-red-500 mb-2">
				To add new choices, delete this question and create new question and
				choices
			</p>
			<p class="font-semibold">Voted on {{ question.vote_vote_cnt }} times</p>
		</div>
		<p v-if="saving">
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
			Saving ...
		</p>
		<!-- updated_choices = {{ updated_choices }}<br /><br />
		choice_values = {{ choice_values }}<br /><br /> -->
		<!-- choices = {{ choices }}<br /><br /> -->

		<FormKit
			type="form"
			v-model="question"
			:config="{ validationVisibility: 'live' }"
			submit-label="Submit"
			@submit="submitForm"
		>
			<FormKit
				type="text"
				label="Question"
				name="vote_question"
				validation="required"
			/>
		</FormKit>
		<Button label="Cancel" @click.prevent="cancelForm()"> </Button>

		<!-- FormKit list input Voodoo -->
		<h6>Choices</h6>
		<FormKit
			v-model="choice_values"
			type="list"
			dynamic
			#default="{ items, node, value }"
		>
			<FormKit
				v-for="(item, index) in items"
				:key="item"
				:index="index"
				:label="'Picked ' + choices[index].vote_picked_cnt + ' times'"
				suffix-icon="trash"
				@suffix-icon-click="
					() => node.input(value.filter((_, i) => i !== index))
				"
				:sections-schema="{
					suffixIcon: {
						// change wrapper to a button for accessibility
						$el: 'button',
					},
				}"
			/>
			<div v-if="!(props.id !== 0)">
				<Button
					type="button"
					label="Add new choice"
					@click="() => node.input(value.concat(''))"
				>
				</Button>
			</div>
			<!-- <pre wrap> In formkit value = {{ value }}</pre> -->
		</FormKit>
		<!-- 		<p class="font-semibold text-red-500">
			Editing a choice will remove existing vote counts!
		</p> -->
		<!-- <Button label="Cancel" @click.prevent="cancelForm()"> </Button> -->
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'

	const auth = useAuthStore()
	// control Prgress Bar
	const saving = ref(false)

	// Outgoing
	//
	const emit = defineEmits(['submitted'])

	// Incoming
	//
	const props = defineProps({
		id: { Number, default: 0 },
	})

	let question = ref({})
	const choices = ref([
		{ vote_choice_id: 0, vote_choice: '', vote_picked_cnt: 0 },
	])
	const choice_values = ref([])
	const updated_choices = ref([])
	const value = ref([])

	//
	// edit if there is an id - add if not
	//
	if (props.id !== 0) {
		// Initialize Edit form
		//
		// get question by id
		const { data: question_data } = await useFetch(`/votes/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		question.value = question_data.value

		// get choices
		//
		const { data: choices_data } = await useFetch(
			`/votes/getchoices/${props.id}`,
			{
				method: 'get',
				headers: {
					authorization: auth.user.token,
				},
			}
		)
		choices.value = choices_data.value

		// create list of choices for Formkit
		choices.value.forEach((choice, index, array) => {
			if (choice.vote_choice !== '') {
				choice_values.value.push(choice.vote_choice)
			}
		})
	}

	// form handlers
	//
	const submitForm = (question) => {
		saving.value = true
		// insert updated values back into choice object
		choice_values.value.forEach((item, index, array) => {
			updated_choices.value.push({
				vote_choice: item,
				vote_picked_cnt: choices.value[index].vote_picked_cnt,
				// vote_picked_cnt: 99,
			})
		})
		// delete old choices and replace with new
		question.choices = []
		question.choices = updated_choices.value

		emit('submitted', question)
	}

	const cancelForm = () => {
		navigateTo('/admin/votes')
	}
</script>

<style>
	.formkit-suffix-icon {
		appearance: none;
		background: none;
		border: none;
		font-size: 1em;
	}
</style>
