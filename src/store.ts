import Vue from "vue";
import Vuex from "vuex";
import main from "./main";
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
    },
  },
  mutations: {
    setLeftDrawer(state, value) {
      state.drawer = value;
    },
    userInfo(state, value) {
      state.userInfo = value
    },
  },
  getters: {
    userInfo: state => state.userInfo,
    userLogged: state => state.userInfo.id ? undefined : false,
    drawer: state => state.drawer,
  },
  plugins: [vuexLocal.plugin]
});
