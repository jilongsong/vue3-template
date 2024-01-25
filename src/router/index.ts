import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import Home from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: 'home'
		}
	},
	{
		path: '/404',
		name: '404',
		component: () => import('../views/404/index.vue'),
		meta: {
			title: '404'
		}
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		name: 'any',
		meta: {
			title: '404'
		}
	}
]

const router: Router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
