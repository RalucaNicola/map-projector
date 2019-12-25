import Vue from "vue";
import Vuex from "vuex";
import Buefy from "buefy";
import App from "./App.vue";
import "./registerServiceWorker";
import "@/styles/custom-bulma.scss";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Buefy);

const store = new Vuex.Store({
  state: {
    activeGuide: "intro"
  },
  mutations: {
    changeActiveGuide(state, activeGuide) {
      state.activeGuide = activeGuide;
    }
  }
});

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
