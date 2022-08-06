import { getToken, setToken } from "@/utils/auth";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  // JSON.parse(localStorage.getItem('TOUITIAO-TOKEN'))
  state: {
    token: getToken() || "",
    cityName: "北京",
    cityId: "AREA|88cff55c-aaa4-e2e0",
    houseCode: "",
    roomType: "",
    floor: "",
    oriented: "",
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
    SET_CITYID(state, payload) {
      state.cityId = payload;
    },
    SET_HOUSECODE(state, payload) {
      state.houseCode = payload;
    },
    SET_ROOMTYPE(state, payload) {
      state.roomType = payload;
    },
    SET_FLOOR(state, payload) {
      state.floor = payload;
    },
    SET_ORIENTED(state, payload) {
      state.oriented = payload;
    },
  },
  actions: {},
  modules: {},
});
