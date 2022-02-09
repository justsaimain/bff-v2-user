export default {
  namespaced: true,
  state: {
    snackbarData: {
      show: false,
      color: "",
      position: "",
      message: "",
    },
  },
  getters: {
    snackbarData(state) {
      return state.snackbarData;
    },
  },
  mutations: {
    SHOW_SNACKBAR_MUTATION() {},
  },
  actions: {
    showSnackbarAction({ state }, data) {
      state.snackbarData.show = true;
      state.snackbarData.color = data.color ? data.color : "primary";
      state.snackbarData.position = data.position ? data.position : "top";
      state.snackbarData.message = data.message
        ? data.message
        : "This is snackbar message";
    },
  },
  modules: {},
};
