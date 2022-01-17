import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
require("vue-scrollto");
require("./store/subscriber");
Vue.config.productionTip = false;

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

axios.defaults.headers.common["x-rapidapi-host"] =
    "fantasy-premier-league3.p.rapidapi.com";
axios.defaults.headers.common["x-rapidapi-key"] =
    "abe4621a9bmshbc1c9a211f870d6p157512jsnd3bbdf64de8b";

store.dispatch("auth/attemptLogin", localStorage.getItem("token")).then(() => {
    new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
    }).$mount("#app");
});
