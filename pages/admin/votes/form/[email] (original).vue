<template>
	<div class="edit">
		<!-- questions = {{ questions }}<br /><br />
		choices = {{ choices }}<br /><br /> -->
		answers = {{ answers }}<br /><br />
		<div v-if="haveQuestions">
			<div v-for="(question, q_index) in questions" :key="q_index">
				<p>Please select {{ question.vote_question }}</p>
				<div v-for="(choice, c_index) in question.choices">
					c_index = {{ c_index }} <br />
					q_index {{ q_index }} <br />
					answers[q_index].vote_choice_id =
					{{ answers[q_index].vote_choice_id }} <br />
					name = {{ q_index }} <br />
					<input
						type="radio"
						name="q_index"
						v-model="answers[q_index].vote_choice_id"
					/>
					<label for="choice.vote_choice_id">{{ choice.vote_choice }}</label>
					<br />
				</div>
				<br />
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
	const value = ref('')

	const initAnswers = () => {
		questions.value.forEach((question) => {
			answers.value.push({
				vote_question_id: question.vote_question_id,
				vote_choice_id: '0',
			})
		})
	}

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

		// questions.value = questions
		haveQuestions.value = questions.value.length
		initAnswers()
		// initialize answers
	}

	getQuestions(account_email)
	/* const handleSubmit = (e) => {
			votesService
				.registerBallot(account_email.value, answers.value)
				.then((vote) => {})
		} */
</script>
