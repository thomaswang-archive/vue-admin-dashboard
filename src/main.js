import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as netlifyIdentityWidget from "netlify-identity-widget";
import GoTrue from "gotrue-js";
import VueFirestore from "vue-firestore";
import "vue-github-buttons/dist/vue-github-buttons.css"; // Stylesheet
import VueGitHubButtons from "vue-github-buttons"; // Component plugin

Vue.config.productionTip = false;

// Initialize Netlify Identity
netlifyIdentityWidget.init();

// Initialize GoTrue JS for Netlify
export const auth = new GoTrue({
  APIUrl: "https://vue-hq.netlify.com/.netlify/identity",
  setCookie: true
})

// Initialize Vue Firestore
Vue.use(VueFirestore);

// Initialize Github Buttons
Vue.use(VueGitHubButtons);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
