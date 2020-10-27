import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './app/app.vue';
import router from './router';
import { store } from './store';

import io from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';

const socket = io('http://localhost:8092');

Vue.use(VueSocketIOExt, socket);
Vue.config.productionTip = false;

new Vue({
  sockets: {
    welcome(val) {
      console.log('socket connected: ' + val)
    },
  },
  methods: {
    joinEvents(args: any) {
      console.log('method joinEvent')
      this.$socket.client.emit('joinEvents', args);
    }
  },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

export default {
};
