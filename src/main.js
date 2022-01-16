import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueLoading from "vuejs-loading-plugin";
import { RotateSquare2 } from "vue-loading-spinner";

Vue.config.productionTip = false;
Vue.use(VueLoading, {
    text: "Ladataan", // default 'Loading'
    customLoader: RotateSquare2, // replaces the spinner and text with your own
});
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
