import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './app/app.vue';
import router from './router';
import store from './store';

import socketio from 'socket.io';
import VueSocketIO from 'vue-socket.io';
let SocketInstance = socketio('http://localhost:8092');
// Vue.use(VueSocketIO, SocketInstance)

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default {
};
