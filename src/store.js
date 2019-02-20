import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Initial State
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  window.localStorage.setItem("isDarkMode", "true");
}

const userSelectedDarkMode = window.localStorage.getItem("isDarkMode") === "true";

const state = {
  isDarkMode: userSelectedDarkMode
}

// Getters
const getters = {
  isDarkMode(state) {
    return state.isDarkMode
  }
}

// Mutations
const mutations = {
  toggleDarkMode(state) {
    if (state.isDarkMode === true) {
      state.isDarkMode = false;
      window.localStorage.setItem("isDarkMode", "false");
    } else {
      state.isDarkMode = true;
      window.localStorage.setItem("isDarkMode", "true");
    }
  }
}

// Actions
const actions = {
  triggerDarkMode(context) {
    context.commit('toggleDarkMode');
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
