import Vue from 'vue';
import vueOnsen from 'vue-onsenui';
import App from './App.vue';
import router from './router';
import store from './store';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

Vue.config.productionTip = false;

Vue.use(vueOnsen);

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid();
  },
}).$mount('#app');
