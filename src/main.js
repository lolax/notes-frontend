import Vue from 'vue'
import firebase from 'firebase/app'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import config from './config'

Vue.use(VueRouter)

Vue.config.productionTip = false

firebase.initializeApp(config)

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
