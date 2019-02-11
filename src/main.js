import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as netlifyIdentityWidget from "netlify-identity-widget";
import GoTrue from "gotrue-js";
import VueFirestore from "vue-firestore";

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
