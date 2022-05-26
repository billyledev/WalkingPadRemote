const splitterModule = {
  namespaced: true,
  state: {
    open: false,
  },
  getters: {},
  mutations: {
    toggle(state, shouldOpen) {
      if (typeof shouldOpen === 'boolean') {
        state.open = shouldOpen;
      } else {
        state.open = !state.open;
      }
    },
  },
  actions: {},
  modules: {},
};

export default splitterModule;
