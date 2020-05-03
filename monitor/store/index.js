import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		vuex_version: '1.0.0',
		vuex_url: '127.0.0.1:7001'
	},
	mutations: {
		setUrl(state, url) {
			state.vuex_url = url
			uni.setStorage({
				key: 'vuexUrl',
				data: url
			})
		}
	},
	actions: {},
	modules: {
		user
	}
})

export default store