<template>
  <div
    class="container"
    :class="{'light-background' : !isDarkMode, 'dark-background' : isDarkMode}"
  >
    <Notification v-if="hasText" :text="text"/>
    <RequestAccount/>
    <div class="login">
      <img src="@/assets/DCHQ.svg" v-show="isDarkMode">
      <img src="@/assets/DCHQ-dark.svg" v-show="!isDarkMode">
      <h4
        :class="{'light-text' : isDarkMode, 'dark-text' : !isDarkMode}"
      >Sign into Design+Code HQ [DEMO]</h4>
      <form @submit.prevent="onSubmit">
        <input
          type="email"
          placeholder="Email"
          :class="{'light-field' : isDarkMode, 'dark-field' : !isDarkMode}"
          v-model="email"
          required
        >
        <input
          type="password"
          placeholder="Password"
          :class="{'light-field' : isDarkMode, 'dark-field' : !isDarkMode}"
          v-model="password"
          required
        >
        <button>Sign In</button>
      </form>
      <router-link
        to="/recover"
        :class="{'light-link': isDarkMode, 'dark-link' : !isDarkMode}"
      >Forgot your password?</router-link>
      <ThemeSwitch/>
      <div class="github-container">
        <gh-btns-star slug="thomaswangio/vue-admin-dashboard" show-count/>
        <gh-btns-fork slug="thomaswangio/vue-admin-dashboard" show-count/>
      </div>
    </div>
  </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";
import Notification from "@/components/Notification";
import { auth } from "@/main";

export default {
  name: "SignIn",
  components: {
    RequestAccount,
    ThemeSwitch,
    Notification
  },
  data() {
    return {
      email: null,
      password: null,
      hasText: false,
      text: ""
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    onSubmit() {
      const email = this.email;
      const password = this.password;

      auth
        .login(email, password, true)
        .then(response => {
          this.$router.replace("/");
        })
        .catch(error => {
          alert("Error: " + error);
        });
    }
  },
  mounted() {
    const params = this.$route.params;

    if (params.userLoggedOut) {
      this.hasText = true;
      this.text = "You have logged out!";
    } else if (params.userRecoveredAccount) {
      this.hasText = true;
      this.text = `A recovery email has been sent to ${params.email}`;
    } else if (params.userRequestedAccount) {
      this.hasText = true;
      this.text = `Your request has been sent to an administator for ${
        params.email
      }`;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 16px;
  padding-bottom: 24px;
}

.login {
  width: 400px;
  text-align: center;
  margin-left: 16px;
  margin-right: 16px;
}

.github-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
