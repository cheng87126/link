import Toastjs from './toast.vue'
let Toast = {}
Toast.install = function (Vue, options) {
    Vue.prototype.$toast = (tips) => {
		let toastTpl = Vue.extend(Toastjs)
		let instance = new toastTpl()
		instance.$data.message = tips.message
        let tpl = instance.$mount().$el
        document.body.appendChild(tpl)
        setTimeout(function () {      
            document.body.removeChild(tpl)
        }, tips.time || 2000)
    }
}
export default Toast