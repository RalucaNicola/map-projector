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
    activeGuide: "intro",
    gridEnabled: true,
    countriesEnabled: true,
    tissotEnabled: false,
    surface: {
      axisLength: 0.01,
      topRadius: 0.01,
      bottomRadius: 4,
      offset: 1
    },
    projectionCenter: {
      scale: 0.01,
      latitude: 0,
      longitude: 90,
      offset: 0
    }
  },
  mutations: {
    changeActiveGuide(state, activeGuide) {
      state.activeGuide = activeGuide;
    },
    toggleGrid(state) {
      state.gridEnabled = !state.gridEnabled;
    },
    toggleCountries(state) {
      state.countriesEnabled = !state.countriesEnabled;
    },
    toggleTissot(state) {
      state.tissotEnabled = !state.tissotEnabled;
    },
    changeSurfaceAxisLength(state, length) {
      state.surface.axisLength = length;
    },
    changeSurfaceOffset(state, offset) {
      state.surface.offset = offset;
    }
  }
});

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
