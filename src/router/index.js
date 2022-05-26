import Vue from 'vue';
import VueRouter from 'vue-router';
import RemoteView from '@/views/RemoteView.vue';
import StatsView from '@/views/StatsView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'remote',
    component: RemoteView,
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
