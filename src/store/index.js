import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		username: '',
		showToast:false,
		msgToast:'',
		timeToast:2000
	},
	mutations: {
		setName (state,payload) {
			state.username = payload.username
		},
		setToast (state,payload) {
			state.showToast = payload.show
			state.msgToast = payload.msg
		}
	},
	actions:{
		setToastAsync ({ commit },payload) {
			setTimeout(()=>{
				commit('setToast',payload)
			},this.state.timeToast)
		}
	}
})