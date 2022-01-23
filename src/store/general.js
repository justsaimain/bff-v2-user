export default {
    namespaced: true,
    state: {
        alert: {
            show: false,
            title: null,
            body: null,
            action: null,
            close: true,
        },
    },
    getters: {
        getAlert(state) {
            return state.alert;
        },
    },
    mutations: {
        SHOW_ALERT(state, data) {
            state.alert.title = data.title;
            state.alert.body = data.body;
            state.alert.action = data.action;
            state.alert.close = data.close;
            state.alert.show = true;
        },
        HIDE_ALERT(state) {
            state.alert.show = false;
            setTimeout(() => {
                state.alert.title = null;
                state.alert.body = null;
                state.alert.close = null;
                state.alert.action = null;
            }, 1000);
        },
    },
    actions: {
        showAlert({ commit }, data) {
            commit("SHOW_ALERT", data);
        },
        hideAlert({ commit }) {
            commit("HIDE_ALERT");
        },
    },
    modules: {},
};
