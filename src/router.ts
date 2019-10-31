import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/home/home.vue')
    },
    {
      path: '/Events',
      name: 'Events',
      component: () => import('./views/events/Events.vue')
    },
  ],
});
