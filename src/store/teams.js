import axios from "axios";

export default {
    namespaced: true,
    state: {
        teams: null,
    },
    getters: {
        teams(state) {
            return state.teams;
        },
    },
    mutations: {
        STORE_TEAMS(state, data) {
            state.teams = data;
        },
    },
    actions: {
        getTeams({ commit }) {
            axios
                .get("https://fantasy-premier-league3.p.rapidapi.com/teams")
                .then((res) => {
                    commit("STORE_TEAMS", res.data);
                })
                .catch((e) => console.log(e));
        },
    },
    modules: {},
};
