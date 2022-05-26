const splitterModule = {
  namespaced: true,
  state: {
    open: false,
  },
  getters: {},
  mutations: {
    toggle(state, shouldOpen) {
      state.open = shouldOpen;
    },
  },
  actions: {},
  modules: {},
};

export default splitterModule;
