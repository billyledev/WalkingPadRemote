import { Module } from 'vuex';

interface SplitterState {
  open: boolean;
}

const splitterModule: Module<SplitterState, any> = {
  namespaced: true,
  state: {
    open: false,
  },
  getters: {},
  mutations: {
    toggle(state: SplitterState, shouldOpen: boolean) {
      state.open = shouldOpen;
    },
  },
  actions: {},
  modules: {},
};

export default splitterModule;
