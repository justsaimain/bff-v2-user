import axios from "axios";

export default {
    namespaced: true,
    state: {
        data: null,
    },
    getters: {
        getOptions(state) {
            return state.data;
        },
    },
    mutations: {
        STORE_OPTIONS(state, data) {
            state.data = data;
        },
    },
    actions: {
        storeOption({ commit }) {
            axios
                .get("/options")
                .then((res) => {
                    let data = res.data.data;
                    commit("STORE_OPTIONS", data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    modules: {},
};
