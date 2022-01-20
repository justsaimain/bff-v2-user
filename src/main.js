import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueOffline from "vue-offline";
import VsToast from "@vuesimple/vs-toast";

import VueScrollPicker from "vue-scroll-picker";

Vue.use(VueScrollPicker);

require("vue-scrollto");
require("./store/subscriber");

Vue.config.productionTip = false;
Vue.use(VueOffline);
Vue.use(VsToast);

// axios.defaults.baseURL = "https://backend.bffsports.com/api";
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["x-rapidapi-host"] =
    "fantasy-premier-league3.p.rapidapi.com";
axios.defaults.headers.common["x-rapidapi-key"] =
    "c3c2bd5fc4msh9c04ca873d3e44cp1effdajsnca8e779ad4de";

store.dispatch("teams/getTeams");

window.onbeforeunload = null;

window.addEventListener("offline", function () {
    alert("You are offline");
});

store.dispatch("auth/attemptLogin", localStorage.getItem("token")).then(() => {
    new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
    }).$mount("#app");
});
