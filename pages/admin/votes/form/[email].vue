<template>
	<div class="edit">
		<!-- questions = {{ questions }}<br /><br /> -->
		choices = {{ choices }}<br /><br />
		options = {{ options }}<br /><br />
		answers = {{ answers }}<br /><br />
		<div v-if="haveQuestions">
			<div v-for="(question, q_index) in questions" :key="q_index">
				q_index = {{ q_index }}
				<FormKit
					v-model="answers[q_index].vote_choice_id"
					type="radio"
					:label="question.vote_question"
					:options="options[q_index]"
				/>
			</div>
		</div>
		<div v-else>
			<h1 class="">You have no unanswered questions</h1>
		</div>
	</div>
</template>

<script setup>
	const route = useRoute()

	const account_email = ref(route.params.email)
	const questions = ref([])
	const choices = ref([])
	const answers = ref([])
	const haveQuestions = ref(0)
	const options = ref([])

	// convert for formkit
	const convertToFormkit = () => {
		options.value = []
		let temparray = []
		let prev = choices.value[0].vote_question_id

		for (let i = 0; i < choices.value.length; i++) {
			const element = choices.value[i]

			// set FormKit radio input label, value pair
			let n = {}
			n.label = element.vote_choice
			n.value = element.vote_choice_id

			if (prev !== element.vote_question_id) {
				// new question - push to options - start new array
				prev = element.vote_question_id
				options.value.push(temparray)
				temparray = []
				temparray.push(n)
			} else {
				temparray.push(n)
			}
			// no more choices - push to options
			if (i === choices.value.length - 1) {
				options.value.push(temparray)
			}
		}
	}

	const initAnswers = () => {
		questions.value.forEach((question) => {
			answers.value.push({
				vote_question_id: question.vote_question_id,
				vote_choice_id: '0',
			})
		})
	}

	// get questions and choices. Convert choices to Formkit options. Init Answers
	const getQuestions = async (account_email) => {
		// get questions
		const account_email_lc = account_email.value.toLowerCase()
		const { data, error: error1 } = await useFetch(
			`/votes/questions/${account_email_lc}`,
			{
				method: 'GET',
				headers: {
					authorization: 'not-needed',
				},
			}
		)
		questions.value = data.value

		// get all choices for all questions
		const { data: ch, error: error2 } = await useFetch(
			`/votes/getusedchoices`,
			{
				method: 'GET',
				headers: {
					authorization: 'not-needed',
				},
			}
		)
		choices.value = ch.value

		// make choices array in each question
		questions.value.forEach((q) => {
			q.choices = []
		})
		// fill choices arrays for each question
		questions.value.forEach((question) => {
			choices.value.forEach((choice) => {
				if (choice.vote_question_id === question.vote_question_id) {
					question.choices.push(choice) // fill choices array
				}
			})
		})
		convertToFormkit()
		haveQuestions.value = questions.value.length
		initAnswers()
	}

	getQuestions(account_email)

	/* const handleSubmit = (e) => {
			votesService
				.registerBallot(account_email.value, answers.value)
				.then((vote) => {})
		} */
</script>
