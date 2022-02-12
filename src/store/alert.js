export default {
  namespaced: true,
  state: {
    snackbarData: {
      show: false,
      color: "",
      position: "",
      message: "",
    },
    dialogData: {
      show: false,
      persistent: true,
      title: "",
      body: "",
      list: null,
      close: true,
    },
  },
  getters: {
    snackbarData(state) {
      return state.snackbarData;
    },
    dialogData(state) {
      return state.dialogData;
    },
  },
  mutations: {},
  actions: {
    showSnackbarAction({ state }, data) {
      state.snackbarData.show = true;
      state.snackbarData.color = data.color ? data.color : "primary";
      state.snackbarData.position = data.position ? data.position : "top";
      state.snackbarData.message = data.message
        ? data.message
        : "This is snackbar message";
    },
    showDialogAction({ state }, data) {
      state.dialogData.show = true;
      state.dialogData.persistent = data.persistent ? data.persistent : true;
      state.dialogData.title = data.title;
      state.dialogData.body = data.body;
      state.dialogData.list = data.list ? data.list : null;
      state.dialogData.close = data.close ? data.close : true;
    },
  },
  modules: {},
};
