import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		username: ''
	},
	mutations: {
		setName (state,payload) {
			state.username = payload.username
		}
	}
})