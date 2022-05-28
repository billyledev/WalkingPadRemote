import Vue from 'vue';
import Vuex from 'vuex';

import navigator from '@/store/navigator.module';
import splitter from '@/store/splitter.module';
import alert from '@/store/alert.module';
import treadmill from '@/store/treadmill.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    navigator,
    splitter,
    alert,
    treadmill,
  },
});
