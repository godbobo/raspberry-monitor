export default {
	
	state: {
		vuex_token: ''
	},
	
	mutations: {
		
		setVuexToken(state, token) {
			state.vuex_token = token
			uni.setStorage({
				key: 'vuexToken',
				data: token
			})
		}
		
	}
	
}