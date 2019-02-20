import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Team from "./views/Team.vue";
import Manage from "./views/Manage.vue";
import SignIn from "./views/SignInFlow/SignIn";
import Request from "./views/SignInFlow/Request";
import Recover from "./views/SignInFlow/Recover";
import * as netlifyIdentityWidget from "netlify-identity-widget";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/Manage",
      name: "manage",
      component: Manage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/team",
      name: "team",
      component: Team,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn
    },
    {
      path: "/request",
      name: "request",
      component: Request
    },
    {
      path: "/recover",
      name: "recover",
      component: Recover
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = netlifyIdentityWidget.currentUser();
  const requiresAuth = to.matched.some(record => {
    return record.meta.requiresAuth
  })

  if (requiresAuth && !currentUser) {
    next("signin");
  } else {
    next();
  }
})

export default router;
