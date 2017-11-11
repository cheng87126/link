import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import App from './App.vue'
import Main from './component/main.vue'
import Url from './component/url.vue'
import Login from './component/login.vue'
import Register from './component/register.vue'
import Resetpwd from './component/resetPwd.vue'
import UserInfo from './component/userInfo.vue'

Vue.use(VueRouter)

import Toast from './js/toast'
Vue.use(Toast)

const routes = [
	{path: '/login', component: Login},
	{path:'/register', component:Register},
	{path:'/resetpassword', component:Resetpwd},
	{
		path: '/', component: Main,
		children:[
			{
				path: '/',
				component: Url
			},{
				path: '/userInfo',
				component: UserInfo
			}
		]
	}
]
const router = new VueRouter({
	routes
})

const APP_ID = '1UoFdSo6fXqSztdHANAIEFiu-gzGzoHsz'
const APP_KEY = 'CI7pJ1UOtYVkVNstGggD4gGy'
const AV = require('leancloud-storage')
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
})

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})