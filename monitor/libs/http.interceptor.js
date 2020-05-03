import store from '@/store'
import Request from './luch-request/index.js'

const http = new Request()

http.setConfig((config) => {
	config.baseUrl = ''
	return config
})

http.interceptor.request((config, cancel) => {
	if (store.state.vuex_url) {
		config.baseUrl = store.state.vuex_url
	}
	
	if (store.state.user.vuex_token) {
		config.header.Authorization = 'Bearer ' + store.state.user.vuex_token
	}
	
	return config
})

http.interceptor.response((response) => {
	return response.data.returnValue
}, (response) => {
	// TODO 401请求删除token 返回登录页面
	return response.data
})

export default http