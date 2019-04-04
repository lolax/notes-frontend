import Vue from 'vue'
import firebase from 'firebase/app'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'

Vue.use(VueRouter)

Vue.config.productionTip = false

const config = {
  apiKey: process.env.VUE_APP_apiKey.trim(),
  authDomain: process.env.VUE_APP_authDomain.trim(),
  databaseURL: process.env.VUE_APP_databaseURL.trim(),
  projectId: process.env.VUE_APP_projectId.trim(),
  storageBucket: process.env.VUE_APP_storageBucket.trim(),
  messagingSenderId: process.env.VUE_APP_messagingSenderId.trim()
};

firebase.initializeApp(config)

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
