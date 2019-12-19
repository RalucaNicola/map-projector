import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import "./registerServiceWorker";
import "@/styles/custom-bulma.scss";

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  render: h => h(App)
}).$mount("#app");
