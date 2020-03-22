import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Footer from './components/Footer.vue'
import Challenges from './components/Challenges.vue'
import Tournaments from './components/Tournaments.vue'
import Ranking from './components/Ranking.vue'
import Navigasjon from './components/Nav.vue'
import Firebase from 'firebase'
import { firestorePlugin } from 'vuefire'

Vue.component("my-footer", Footer);
Vue.component("my-challenges", Challenges);
Vue.component("my-ranking", Ranking);
Vue.component("my-tournaments", Tournaments);
Vue.component("navigasjon", Navigasjon);

Vue.config.productionTip = true; // Skru av for production!
Vue.config.devtools = true;

// Middleware
Vue.use(Buefy, { defaultIconPack: 'fas' });
Vue.use(firestorePlugin);
Vue.use(Firebase);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
