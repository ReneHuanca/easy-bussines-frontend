import AuthService from '../services/auth.service'

// Initial Status Users logged
// const user = JSON.parse(localStorage.getItem('userToken'));
const userToken = JSON.parse(localStorage.getItem('userToken'));
const initialState = userToken
	? { status: { loggedIn: true }, user: userToken }
	: { status: { loggedIn: false }, user: null };

export const auth = {
	namespaced: true,

	state: initialState,

	actions: {
		async login({ commit }, user) {
			try {
				const response = await AuthService.login(user);
				commit('loginSuccess', response);

				return Promise.resolve(user);
			} catch (error) {
				commit('loginFailure');

				return Promise.reject(error)
			}
		},
		logout({ commit }) {
			AuthService.logout()
			commit('logout');
		},

		// register({ commit }, user) {
		// 	return AuthService.register(user).then(
		// 		response => {
		// 			commit('registerSuccess');
		// 			return Promise.resolve(response.data);
		// 		},
		// 		error => {
		// 			commit('registerFailure');
		// 			return Promise.reject(error);
		// 		}
		// 	);
		// }
	},
	
	mutations: {
		loginSuccess(state, user) {
			state.status.loggedIn = true;
			state.user = user;
		},
		loginFailure(state) {
			state.status.loggedIn = false;
			state.user = null;
		},
		logout(state) {
			state.status.loggedIn = false;
			state.user = null;
		},
		// registerSuccess(state) {
		// 	state.status.loggedIn = false;
		// },
		// registerFailure(state) {
		// 	state.status.loggedIn = false;
		// }
	}
}
