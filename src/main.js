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

// axios.defaults.baseURL = "https://backend.bffsports.com/api";
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["x-rapidapi-host"] =
    "fantasy-premier-league3.p.rapidapi.com";
axios.defaults.headers.common["x-rapidapi-key"] =
    "cea6ec2c46msh6647e81ef212a46p165485jsn0404abbd0d1c";

store.dispatch("auth/attemptLogin", localStorage.getItem("token")).then(() => {
    new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
    }).$mount("#app");
});
