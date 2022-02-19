import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import alert from "./alert";
import teams from "./teams";
import general from "./general";
import options from "./options";
import axios from "axios";
import home from "./home";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async getTeamsDataAction() {
      const result = await (await axios.get("/teams")).data;
      return {
        status: "success",
        data: result,
        message: "Success",
        error: [],
      };
    },
  },
  modules: {
    auth,
    teams,
    general,
    options,
    alert,
    home,
  },
});
