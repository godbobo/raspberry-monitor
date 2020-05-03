import Vue from 'vue'
import App from './App'
import uView from '@/uview'
import './libs/bobo-router'
import store from '@/store'
import helper from '@/libs/helper.js'
import '@/libs/boot.js'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(uView)
Vue.prototype.$h = helper

const app = new Vue({
	store,
    ...App
})

app.$mount()
