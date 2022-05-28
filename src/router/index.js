import Vue from 'vue';
import VueRouter from 'vue-router';

import AppNavigator from '@/components/AppNavigator.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: AppNavigator,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
