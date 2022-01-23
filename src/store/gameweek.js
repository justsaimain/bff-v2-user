import axios from "axios";

export default {
    namespaced: true,
    state: {
        gameweek: null,
    },
    getters: {
        getGameweek(state) {
            return state.gameweek;
        },
    },
    mutations: {
        STORE_GAMEWEEK(state, gameweek) {
            state.gameweek = gameweek;
        },
    },
    actions: {
        storeGameweek({ commit }) {
            axios
                .get("/options")
                .then((res) => {
                    let data = res.data.data;
                    commit("STORE_GAMEWEEK", data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    modules: {},
};
