import 'dayjs/plugin/utc'
const { $dayjs } = useNuxtApp()

export default function useUTC() {
	const toUTC = async (state, app) => {
		if (app === 'news') {
			console.log('IN utc app = ', app)
			state.news_event_dt = $dayjs(state.news_event_dt).utc().format()
			state.news_release_dt = $dayjs(state.news_release_dt).utc().format()
			state.news_expire_dt = $dayjs(state.news_expire_dt).utc().format()
		} else if (app === 'events') {
			state.event_dt = $dayjs(state.event_dt).utc().format()
			state.release_dt = $dayjs(state.release_dt).utc().format()
			state.expire_dt = $dayjs(state.news_expire_dt).utc().format()
		} else if (app === 'content') {
			state.content_release_dt = $dayjs(state.content_release_dt).utc().format()
			state.content_expire_dt = $dayjs(state.content_expire_dt).utc().format()
		} else if (app === 'payments') {
			state.release_dt = $dayjs(state.release_dt).utc().format()
			state.expire_dt = $dayjs(state.expire_dt).utc().format()
		} else if (app === 'videos') {
			state.video_release_dt = $dayjs(state.video_release_dt).utc().format()
			state.video_expire_dt = $dayjs(state.video_expire_dt).utc().format()
			state.video_event_dt = $dayjs(state.video_event_dt).utc().format()
		}
		return state
	}

	return { toUTC }
}
