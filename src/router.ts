import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./pages/Home/Home.vue')
    },
    {
      path: '/Events',
      name: 'Events',
      component: () => import('./pages/Event/Events.vue')
    },
    {
      path: '/Questionnaires',
      name: 'Questionnaires',
      component: () => import('./pages/Questionnaire/Questionnaire.vue')
    },
  ],
});
