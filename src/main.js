import Vue from "vue";
import Vuex from "vuex";
import Buefy from "buefy";
import App from "./App.vue";
import "./registerServiceWorker";
import "@/styles/custom-bulma.scss";
import "@/styles/app-style.scss";
import { initialParameters } from "./parameters.js";

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
      ...initialParameters.surface
    },
    projectionCenter: {
      ...initialParameters.projectionCenter
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
    },
    changePCenterOffset(state, offset) {
      state.projectionCenter.offset = offset;
    },
    changePCenterScale(state, scale) {
      state.projectionCenter.scale = scale;
    }
  }
});

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
