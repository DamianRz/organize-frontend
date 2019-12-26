import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    drawer: false,
    userInfo: {
      id: undefined,
      token: undefined,
      username: undefined,
      logged: false
    },
  },
  mutations: {
    setLeftDrawer(state: any, value) {
      state.drawer = value;
    },
    userInfo(state: any, value) {
      state.userInfo = value
    },
  },
  getters: {
    userInfo: state => state.userInfo,
    userLogged: state => state.userInfo.logged,
    drawer: state => state.drawer,
  },
  plugins: [vuexLocal.plugin]
});
