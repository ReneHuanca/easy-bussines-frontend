import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({
	// mode: 'hash',
	mode: 'history',

	base: process.env.BASE_URL,

	routes: [
		{
			path: '/',
			redirect: '/login'
		},
		{
			name: 'Login',
			path: '/login',
			component: () => import('@/views/dashboard/Login')
		},
		{
			path: '/dashboard',
			component: () => import('@/views/dashboard/Index'),
			children: [
				// Dashboard
				{
					name: 'Dashboard',
					path: '',
					component: () => import('@/views/dashboard/Dashboard'),
				},
				{
					name: 'User Profile',
					path: 'pages/user',
					component: () => import('@/views/dashboard/pages/UserProfile'),
				},
				// customers
				{
					name: 'Clientes',
					path: 'customers',
					component: () => import('@/views/dashboard/pages/customers/index'),
				},
				{
					name: 'Agregar Cliente',
					path: 'customers/create',
					component: () => import('@/views/dashboard/pages/customers/create'),
				},
				{
					name: 'Editar Cliente',
					path: 'customers/edit/:id',
					component: () => import('@/views/dashboard/pages/customers/edit'),
				},

				// sales
				{
					name: 'Ventas',
					path: 'sales',
					component: () => import('@/views/dashboard/pages/sales/index'),
				},
				{
					name: 'Agregar Nueva Venta',
					path: 'sales/create',
					component: () => import('@/views/dashboard/pages/sales/create'),
				},


				// Products
				{
					name: 'Productos',
					path: 'products',
					component: () => import('@/views/dashboard/pages/products/index'),
				},
				{
					name: 'Agregar Producto',
					path: 'products/create',
					component: () => import('@/views/dashboard/pages/products/create'),
				},
				{
					name: 'Editar Producto',
					path: 'products/edit/:id',
					component: () => import('@/views/dashboard/pages/products/edit'),
				},

				// Categories
				{
					name: 'Categorias',
					path: 'categories',
					component: () => import('@/views/dashboard/pages/categories/index'),
				},
				{
					name: 'Agregar Categoria',
					path: 'categories/create',
					component: () => import('@/views/dashboard/pages/categories/create'),
				},
				{
					name: 'Editar Categoria',
					path: 'categories/edit/:id',
					component: () => import('@/views/dashboard/pages/categories/edit'),
				},

				// configurations
				{
					name: 'Configurations',
					path: 'pages/configurations',
					component: () => import('@/views/dashboard/pages/Configurations'),
				},
				{
					name: 'Notifications',
					path: 'components/notifications',
					component: () => import('@/views/dashboard/component/Notifications'),
				},
			],
		},
		{
			path: '*',
			redirect: '/dashboard'
		}
	],
})

router.beforeEach((to, from, next) => {
	const isAuthenticated = store.state.auth.status.loggedIn;
	if(to.name !== 'Login' && !isAuthenticated) {
		next({name: 'Login'})
	} else {
		next()
	}
});

export default router;
