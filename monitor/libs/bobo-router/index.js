import Vue from 'vue'
import Router from './bobo-router'
import store from '@/store'

Vue.use(Router)

// 路由配置 页面中全部使用this.$Router来操作路由，以实现路由的全局管理
const router = new Router()

// 路由全局拦截器 在这里处理登录、授权等相关操作
router.beforeEach(function(to, from, next) {
	if (!store.state.user.vuex_token && to.page !== '/pages/user/login') {
		next({page: '/pages/user/login'})
	} else {
		next()
	}
})

// 路由后置拦截器
router.afterEach(function (to, from) {
})

// 路由跳转出错处理
router.onError(function(e) {
	console.log('错误：', e.message || '路由跳转失败')
})

export default router