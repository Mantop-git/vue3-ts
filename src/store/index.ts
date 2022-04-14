import { createStore } from "vuex";
import loginMoudle from './login/login'

export default createStore({
  state: {
    name: "mantop",
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginMoudle
  },
});
