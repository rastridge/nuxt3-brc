<template>
	<div id="clubhouse">
		<div>
			<common-header title="Virtual Clubhouse" />
		</div>
		<div class="bg">
			<div class="flex flex-wrap align-self-start justify-content-center">
				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-12rem p-2 border-1"
				>
					<div class="text-center mb-1">Team Photos Room</div>
					<div>
						<nuxt-link :to="`/clubhouse/room/photo`">
							<a>
								<img
									src="https://res.cloudinary.com/rfamedia/image/upload/v1677355607/brc/clubhouse/wood-door-1-500x500_dqhdtt.png"
									class="w-full"
								/>
							</a>
						</nuxt-link>
					</div>
				</div>

				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-12rem p-2 border-1"
				>
					<div class="text-center mb-1">Wall of Fame</div>
					<nuxt-link :to="`/clubhouse/room/wof`">
						<a>
							<img
								src="https://res.cloudinary.com/rfamedia/image/upload/v1677355607/brc/clubhouse/wood-door-1-500x500_dqhdtt.png"
								class="w-full"
							/>
						</a>
					</nuxt-link>
				</div>

				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-12rem p-2 border-1"
				>
					<div class="text-center mb-1">Trophy Room</div>
					<nuxt-link :to="`/clubhouse/room/trophy`">
						<a>
							<img
								src="https://res.cloudinary.com/rfamedia/image/upload/v1677355607/brc/clubhouse/wood-door-1-500x500_dqhdtt.png"
								class="w-full"
							/>
						</a>
					</nuxt-link>
				</div>

				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-12rem p-2 border-1"
				>
					<div class="text-center mb-1">Plaques Room</div>
					<nuxt-link :to="'/clubhouse/room/plaque'"
						><a>
							<img
								src="https://res.cloudinary.com/rfamedia/image/upload/v1677355607/brc/clubhouse/wood-door-1-500x500_dqhdtt.png"
								class="w-full"
						/></a>
					</nuxt-link>
				</div>

				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-12rem p-2 border-1"
				>
					<div class="text-center mb-1">Jerseys Room</div>
					<nuxt-link :to="'/clubhouse/room/jersey'"
						><a>
							<img
								src="https://res.cloudinary.com/rfamedia/image/upload/v1677355607/brc/clubhouse/wood-door-1-500x500_dqhdtt.png"
								class="w-full"
						/></a>
					</nuxt-link>
				</div>

				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-12rem p-2 border-1"
				>
					<div class="text-center mb-1">Balls Room</div>
					<nuxt-link :to="'/clubhouse/room/ball'"
						><a>
							<img
								src="https://res.cloudinary.com/rfamedia/image/upload/v1677355607/brc/clubhouse/wood-door-1-500x500_dqhdtt.png"
								class="w-full"
						/></a>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
	.bg {
		background-image: url('https://media.buffalorugby.org/_img/_backgrounds/wood_clubhouse.jpg');
		/* Center and scale the image nicely */
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		padding: 2em;
		padding-bottom: 5em;
	}
	.door {
		width: 160px;
		margin-right: 2rem;
		font-size: 1em;
		text-align: center;
		color: white;
	}
</style>
