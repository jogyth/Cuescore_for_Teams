import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Footer from './components/Footer.vue'
import Challenges from './components/Challenges.vue'

Vue.component("my-footer", Footer);
Vue.component("my-challenges", Challenges);

Vue.config.productionTip = true // Skru av for production!

// Middleware
Vue.use(Buefy, { defaultIconPack: 'fas' });

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
