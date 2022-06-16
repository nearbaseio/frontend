import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

  namespace: true,
  state: {
    baseURL: process.env.BASE_URL,
    theme: "light",
    user: {
      perfil: require("@/assets/user/avatar.png"),
      initials: 'JD',
      fullName: 'John Doe',
      email: 'john.doe@doe.com',
    },
    filterState: true,
    dataControls: [
      {
        key: "purchased",
        name: "PURCHASED",
        to: "/settings/wallets/purchased",
        active: false,
      },
      {
        key: "sold",
        name: "SOLD",
        to: "/settings/wallets/sold",
        active: false,
      },
      {
        key: "sale",
        name: "FOR SALE",
        to: "/settings/wallets/sale",
        active: false,
      },
    ],
  },
  mutations: {
    Avatar (state, avatar) {
      state.user.perfil = avatar
    },
    CambiarTheme(state, theme) {
      state.theme = theme
    },
    NavigateWallets(state, key) {
      state.dataControls.forEach(element => {element.active = false});
      if (key == 'purchased') {state.dataControls[0].active = true}
      if (key == 'sold') {state.dataControls[1].active = true}
      if (key == 'sale') {state.dataControls[2].active = true}
      if (key == 'publish') {state.dataControls[2].active = true}
    },
    FilterState(state, key) {
      if (key == 'active') {state.filterState = true}
      if (key == 'inactive') {state.filterState = false}
    },
  },
  actions: {
    CambiarTheme({state, commit}, {theme, element}) {
      element.href = `${state.baseURL}themes/${theme}/theme.css`;
      localStorage.setItem("theme", theme);
      commit( "CambiarTheme", theme)
    },
    NavigateWallets({commit}, {key}) {
      commit( "NavigateWallets", key)
    },
    FilterState({commit}, {key}) {
      commit( "FilterState", key)
    },
    Avatar({commit}, {avatar}) {
      commit( "Avatar", avatar )
    }
  },
});
