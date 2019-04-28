import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'

Vue.prototype.$ajax = Axios
Vue.config.productionTip = false

let vm = new Vue({
  render: h => h(App),
}).$mount('#app')
