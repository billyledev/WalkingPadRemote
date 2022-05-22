import Vue from 'vue';
import Vuex from 'vuex';

import splitter from './splitter.module';
import alert from './alert.module';
import treadmill from './treadmill.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    splitter,
    treadmill,
    alert,
  },
});
