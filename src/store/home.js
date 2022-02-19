import axios from "axios";

export default {
  namespaced: true,
  state: {
    home: null,
  },
  getters: {
    getHomeData(state) {
      return state.home;
    },
  },
  mutations: {},
  actions: {
    async getHomeDataAction() {
      const res = (await axios.get("home-data")).data;

      return {
        status: "success",
        data: res.data,
        message: "Success",
      };
    },
  },
  modules: {},
};
