<template>
  <div class="manage">
    <Header/>
    <div class="container">
      <h1 :class="{'dark' : !isDarkMode, 'light' : isDarkMode}">Manage Users</h1>
      <p
        :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"
      >Enter either customer email or subscription ID</p>
      <form @submit.prevent="getUserData" class="manage-container">
        <input
          v-model="email"
          :disabled="subscriptionId.length > 0"
          type="email"
          style="margin: 0"
          class="field"
          :class="{'light-field': isDarkMode, 'dark-field': !isDarkMode}"
          placeholder="Customer Email"
        >
        <p
          :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"
          style="margin: 0 20px 0 20px"
        >or</p>
        <input
          v-model="subscriptionId"
          :disabled="email.length > 0"
          type="text"
          style="margin: 0"
          class="field"
          :class="{'light-field': isDarkMode, 'dark-field': !isDarkMode}"
          placeholder="Subscription ID"
        >
        <button
          class="manage-button button"
          :disabled="!email && !subscriptionId"
        >Get Customer Details</button>
      </form>
      <hr class="line-break">
      <h1 :class="{'dark' : !isDarkMode, 'light' : isDarkMode}">Customer Details</h1>
      <div class="details-container">
        <div class="detail">
          <div
            class="detail-title"
            :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"
          >Subscription State</div>
          <div
            class="detail-text"
            :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"
          >{{subscriptionState}}</div>
        </div>
        <div class="detail">
          <div
            class="detail-title"
            :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"
          >Seated</div>
          <div
            class="detail-text"
            :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"
          >{{seated}}</div>
        </div>
        <div class="detail">
          <div
            class="detail-title"
            :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"
          >On Trial</div>
          <div
            class="detail-text"
            :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"
          >{{onTrial}}</div>
        </div>
        <div class="detail">
          <div
            class="detail-title"
            :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"
          >Trial End Date</div>
          <div
            class="detail-text"
            :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"
          >{{trialEndDate}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "manage",
  components: {
    Header
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  data() {
    return {
      email: "",
      subscriptionId: "",
      subscriptionState: "",
      seated: "",
      onTrial: "",
      trialEndDate: ""
    };
  },
  methods: {
    getUserData() {
      let url = new URL("http://vue-hq.netlify.com/.netlify/functions/hello");

      const data = {
        email: this.email,
        subscriptionId: this.subscriptionId
      };

      url.search = new URLSearchParams(data);

      this.subscriptionState = "Loading...";
      this.seated = "Loading...";
      this.onTrial = "Loading...";
      this.trialEndDate = "Loading...";

      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.subscriptionState = data.subscriptionStatus;
          this.seated = data.seated;
          this.onTrial = data.onTrial;
          this.trialEndDate = data.trialEndDate;
        }).catch(error => {
          this.subscriptionState = "";
          this.seated = "";
          this.onTrial = "";
          this.trialEndDate = "";
          alert(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding-left: 15%;
  padding-right: 15%;
}

h1 {
  margin-top: 40px;
}

p {
  line-height: 25px;
  font-size: 16px;
  font-weight: 400;
}

.manage-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  
  @media all and (max-width: 767px) {
    flex-direction: column;
  }
}

.manage-button {
  margin: 0 0 0 25px;
  
  @media all and (max-width: 767px) {
    margin: 25px;
  }
}

.line-break {
  opacity: 0.2;
  height: 1px;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
}

.details-container {
  margin: 0 -40px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: space-evenly;
}

.detail {
  width: 400px;
  max-width: 35%;
  margin: 20px 40px;
}

.detail-title {
  opacity: 0.3;
  margin-bottom: 16px;
}

.detail-text {
  margin-top: -12px;
  line-height: 31px;
  font-size: 20px;
}
</style>
