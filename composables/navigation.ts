import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()
import { useMenuStore } from '@/stores'
const menuStore = useMenuStore()
const customMenuItems = menuStore.getCustomMenuItems

const checkPerm = (app) => {
	const user = auth.user
	const temp = user.perms
	const perms = temp.find(function (u) {
		return u.admin_app_name === app
	})
	return perms.admin_perm
}

export function useNavigationMenu() {
	const navigationMenu = () => {
		let menu = []
		customMenuItems.forEach((element) => {
			menu.push(element)
		})
		menu.push(
			{
				label: 'Officers',
				to: '/officers',
			},
			{
				label: 'Members',
				to: '/members',
			},

			{
				label: 'Sponsors',
				to: '/sponsors',
			},
			{
				label: 'Payments',
				to: '/payments',
			}
		)

		return [
			{
				label: 'Homepage',
				to: '/',
				icon: 'pi pi-fw pi-home',
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'About',
				icon: 'pi pi-fw pi-file',
				visible: () => !auth.isLoggedIn,
				items: menu,
			},
			{
				label: 'News',
				icon: 'pi pi-fw pi-pencil',
				visible: () => !auth.isLoggedIn,

				items: [
					{
						label: 'News',
						to: '/news',
					},
					{
						label: 'Events',
						to: '/events',
					},
					{
						label: 'Contributions',
						to: '/contributions',
					},
					{
						label: 'Community Service',
						to: '/communityservice',
					},
				],
			},
			{
				label: 'Competition',
				icon: 'pi pi-fw pi-user',
				visible: () => !auth.isLoggedIn,

				items: [
					{
						label: 'Schedule',
						icon: 'pi pi-fw pi-user-plus',
						to: '/games/schedule/0',
					},
					{
						label: 'Player Stats 15s',
						icon: 'pi pi-fw pi-user-minus',
						to: '/stats/player_stats',
					},
					{
						label: 'Player Stats 7s',
						icon: 'pi pi-fw pi-user-minus',
						to: '/stats/player_stats7s',
					},
					{
						label: 'Player Games',
						icon: 'pi pi-fw pi-user-minus',
						to: '/stats/player_history',
					},
					{
						label: 'Team Record',
						icon: 'pi pi-fw pi-user-minus',
						to: '/stats/team_stats',
					},
				],
			},
			{
				label: 'History',
				icon: 'pi pi-fw pi-calendar',
				visible: () => !auth.isLoggedIn,

				items: [
					{
						label: 'Clubhouse',
						icon: 'pi pi-fw pi-pencil',
						to: '/sponsors',
					},
					{
						label: 'Opponents',
						icon: 'pi pi-fw pi-power-off',
						to: '/opponents',
					},
					{
						label: 'Document Archives',
						icon: 'pi pi-fw pi-pencil',
						to: '/archive/documents',
					},
					{
						label: 'Leaders',
						icon: 'pi pi-fw pi-power-off',
						to: '/leaders',
					},
					{
						label: 'Videos',
						icon: 'pi pi-fw pi-power-off',
						to: '/videos',
					},
					{
						label: 'Photos',
						icon: 'pi pi-fw pi-power-off',
						to: '/photos',
					},
					{
						label: 'Newsletters',
						icon: 'pi pi-fw pi-power-off',
						to: '/sponsors',
					},
					{
						label: 'News',
						icon: 'pi pi-fw pi-power-off',
						to: '/sponsors',
					},
					{
						label: 'Documents',
						icon: 'pi pi-fw pi-power-off',
					},
					{
						label: 'Photos',
						icon: 'pi pi-fw pi-power-off',
						to: '/sponsors',
					},
					{
						label: '50th Anniversary',
						icon: 'pi pi-fw pi-power-off',
						to: '/sponsors',
					},
				],
			},
			/* 			{
				label: 'Custom Pages',
				items: customMenuItems,
				visible: () => !auth.isLoggedIn,
			}, */

			{
				label: 'Login',
				icon: 'pi pi-fw pi-sign-in',
				to: '/loginpage',
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'Admin',
				icon: 'pi pi-fw pi-plus',
				items: [
					{
						label: 'Admin Home',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin',
						visible: () => checkPerm('users') > 0,
					},
					{
						label: 'Admin Users',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/users',
						visible: () => checkPerm('users') > 0,
					},
					{
						label: 'Clubhouse',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/clubhouse',
						visible: () => checkPerm('clubhouse') > 0,
					},
					{
						label: 'Content',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/content',
						visible: () => checkPerm('content') > 0,
					},
					{
						label: 'Contributions',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/contributions',
						visible: () => checkPerm('contributions') > 0,
					},
					{
						label: 'Document Archive',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/archive',
						visible: () => checkPerm('archive') > 0,
					},
					{
						label: 'Events',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/events',
						visible: () => checkPerm('events') > 0,
					},
					{
						label: 'Leaders',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/leaders',
						visible: () => checkPerm('leaders') > 0,
					},
					{
						label: 'Members Men',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/accounts/men',
						visible: () => checkPerm('accounts/men') > 0,
					},
					{
						label: 'News',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/news',
						visible: () => checkPerm('news') > 0,
					},
					{
						label: 'Newsletters',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/newsletters',
						visible: () => checkPerm('newsletters') > 0,
					},
					{
						label: 'Opponents',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/opponents',
						visible: () => checkPerm('opponents') > 0,
					},
					{
						label: 'Payments',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/payments',
						visible: () => checkPerm('payments') > 0,
					},
					{
						label: 'Sponsors',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/sponsors',
						visible: () => checkPerm('sponsors') > 0,
					},
					{
						label: 'Game stats',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/game_player_stats',
						visible: () => checkPerm('game_player_stats') > 0,
					},
					{
						label: 'Supporting Accounts',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/supporting_accounts',
						visible: () => checkPerm('supporting_accounts') > 0,
					},
					{
						label: 'Texts',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/sms',
						visible: () => checkPerm('sms') > 0,
					},

					{
						label: 'Videos',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/videos',
						visible: () => checkPerm('videos') > 0,
					},
					{
						label: 'Log out',
						icon: 'pi pi-fw pi-sign-out',
						to: '/logout',
						visible: () => auth.isLoggedIn,
					},
				],
				visible: () => auth.isLoggedIn,
			},
		]
	}
	return { navigationMenu }
}
