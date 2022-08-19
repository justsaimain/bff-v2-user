import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueOffline from "vue-offline";
import VsToast from "@vuesimple/vs-toast";
import VueProgressBar from "vue-progressbar";
import VueScrollPicker from "vue-scroll-picker";
import VueAnalytics from "vue-analytics";
import Hotjar from "vue-hotjar";
import wb from "./registerServiceWorker";

Vue.prototype.$workbox = wb;

Vue.use(VueScrollPicker);

require("vue-scrollto");
require("./store/subscriber");

Vue.config.productionTip = false;
Vue.use(VueOffline);
Vue.use(VsToast);

const options = {
  color: "#4c2fe3",
  failedColor: "#874b4b",
  thickness: "5px",
  transition: {
    speed: "1s",
    opacity: "0.6s",
    termination: 1000,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

Vue.use(VueProgressBar, options);
Vue.use(VueAnalytics, {
  id: "UA-236555968-1",
  router,
});
Vue.use(Hotjar, {
  id: "3112019", // Hotjar Site ID
  // isProduction: true,
  snippetVersion: 6,
});
axios.defaults.baseURL = "https://backend.bffsports.com/api";
// axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["x-rapidapi-host"] =
  "fantasy-premier-league3.p.rapidapi.com";
axios.defaults.headers.common["x-rapidapi-key"] =
  "abe4621a9bmshbc1c9a211f870d6p157512jsnd3bbdf64de8b";

window.onbeforeunload = null;

window.addEventListener("offline", function () {
  alert("You are offline");
});

Promise.all([
  store.dispatch("options/storeOption"),
  store.dispatch("teams/getTeams"),
  store.dispatch("auth/attemptLogin", localStorage.getItem("token")),
]).finally(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
