import axios from "axios";

export default {
  namespaced: true,
  state: {
    number: null,
    request_id: null,
    token: null,
    user: null,
  },
  getters: {
    getNumber(state) {
      return state.number;
    },
    getRequestID(state) {
      return state.request_id;
    },
    authenticated(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    STORE_NUMBER(state, number) {
      state.number = number;
    },
    STORE_REQUEST_ID(state, request_id) {
      state.request_id = request_id;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    },
  },
  actions: {
    storeOTP({ commit }, extra) {
      commit("STORE_NUMBER", extra.number);
      commit("STORE_REQUEST_ID", extra.request_id);
    },
    attemptLogin({ state, commit }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }
      if (!state.token) {
        return;
      }

      axios
        .get("auth/me")
        .then((res) => {
          console.log(res);
          commit("SET_USER", res.data.data);
        })
        .catch((e) => {
          commit("SET_TOKEN", null);
          commit("SET_USER", null);
          console.log(e);
        });
    },
    storeUser({ commit }, data) {
      commit("SET_USER", data);
      return true;
    },
    Logout({ commit }) {
      return axios.post("auth/logout").then(() => {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      });
    },
  },
};
