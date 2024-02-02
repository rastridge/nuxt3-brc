import pkg from './package.json'
import vsharp from 'vite-plugin-vsharp'

export default defineNuxtConfig({
	devtools: false,
	ssr: false,
	vite: {
		plugins: [vsharp()],
	},
	runtimeConfig: {
		API_SECRET: process.env.API_SECRET,
		DB_HOST: process.env.DB_HOST,
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_DATABASE: process.env.DB_DATABASE,
		DATABASE_URL: process.env.DATABASE_URL,
		SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
		ONSERVER: process.server,
		ONCLIENT: process.client,

		TO: process.env.TO,
		TO_FLAG: process.env.TO_FLAG,
		FROM: process.env.FROM,
		FROM_NAME: process.env.FROM_NAME,

		apiSecret: process.env.API_SECRET,
		EE_API_KEY: process.env.EE_API_KEY,
		TWILIO_NUMBER: process.env.TWILIO_NUMBER,
		TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
		TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
		CLOUD_NAME: process.env.CLOUD_NAME,
		CLOUD_API_KEY: process.env.CLOUD_API_KEY,
		CLOUD_API: process.env.CLOUD_API,
		CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
		CLOUD_UPLOAD_PRESET: process.env.CLOUD_UPLOAD_PRESET,
		MY_MEDIA_API: process.env.MY_MEDIA_API,
		SEASON_DIVIDE_DATE: process.env.SEASON_DIVIDE_DATE,

		// Keys within public, will be also be
		// exposed to the client-side
		public: {
			APP_VERSION: pkg.version,
			APP_NAME: pkg.name,
			HOST: process.env.HOST,
			TITLE: process.env.TITLE,
		},
	},
	modules: [
		'@formkit/nuxt',
		'@pinia/nuxt',
		'@nuxt/image',
		// '@vueuse/nuxt',
		'nuxt-simple-robots',
	],
	buildModules: ['@nuxtjs/google-fonts'],

	/* 	robots: {
		// provide simple disallow rules for all robots `user-agent: *`
		disallow: ['/'],
	}, */

	components: [
		'~/components/app',
		'~/components/selectors',
		'~/components/forms',
		'~/components/displays',
		'~/components',
	],

	dayjs: {
		locales: ['en'],
		defaultLocale: 'en',
		defaultTimeZone: 'America/New_York',
		plugins: [
			'utc', // import 'dayjs/plugin/utc'
			'timezone', // import 'dayjs/plugin/timezone'
		],
	},

	primevue: {
		config: {
			ripple: true,
		},
	},
	css: [
		'primevue/resources/primevue.css',
		'primeicons/primeicons.css',
		'primeflex/primeflex.css',
	],

	googleFonts: {
		prefetch: true,
		families: {
			Roboto: true,
			Anton: true,
			'Josefin+Sans': true,
			Lato: [100, 300],
			Raleway: {
				wght: [100, 400],
				ital: [100],
			},
		},
	},

	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
		],
	},
	build: {
		// transpile: ['nuxt', 'primevue'],
		transpile: ['primevue'],
	},
})
