import { getToken, setToken } from "@/utils/auth";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  // JSON.parse(localStorage.getItem('TOUITIAO-TOKEN'))
  state: {
    token: getToken() || "",
    cityName: "",
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
      setToken(payload);
    },
    SET_CITYNAME(state, payload) {
      state.cityName = payload;
    },
  },
  actions: {},
  modules: {},
});
