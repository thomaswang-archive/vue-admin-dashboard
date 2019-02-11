<template>
  <div class="home">
    <Header/>
    <div class="container">
      <div class="spread">
        <h1 :class="{'dark' : !isDarkMode, 'light' : isDarkMode}">Traffic Overview</h1>
        <div class="toggle" :class="{'light-box' : isDarkMode, 'dark-box' : !isDarkMode}">
          <div ref="days" class="days" @click="toggleDays">Days</div>
          <div ref="weeks" class="weeks" @click="toggleWeeks">Weeks</div>
          <div ref="months" class="months" @click="toggleMonths">Months</div>
        </div>
      </div>
      <apexchart width="100%" type="area" :options="chartOptions" :series="series"></apexchart>
      <iframe
        v-if="isDarkMode"
        width="600"
        height="450"
        src="https://datastudio.google.com/embed/reporting/12VV95wfJ9-kW8pskiGHrrl5_GlVD5xkJ/page/R8xh"
        frameborder="0"
        style="border:0"
        allowfullscreen
      ></iframe>
      <iframe
        v-if="!isDarkMode"
        width="600"
        height="450"
        src="https://datastudio.google.com/embed/reporting/1OX46PfUsV3Ad20eNDTvnFOBbq3m57hK6/page/R8xh"
        frameborder="0"
        style="border:0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Header from "@/components/Header.vue";

export default {
  name: "home",
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  components: {
    Header,
    apexchart: VueApexCharts
  },
  data() {
    return {
      chartOptions: {
        colors: ["#14f1d9", "#7b42f6"],
        legend: {
          labels: {
            colors: [this.$store.getters.isDarkMode ? "white" : "black"]
          },
          position: "top"
        },
        tooltip: {
          theme: "dark"
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        chart: {
          id: "users"
        },
        xaxis: {
          type: "datetime"
        }
      },
      series: [
        {
          name: "active users",
          data: [
            [new Date("January 1, 2019"), 30],
            [new Date("January 5, 2019"), 40]
          ]
        },
        {
          name: "new users",
          data: [
            [new Date("January 1, 2019"), 80],
            [new Date("January 5, 2019"), 20]
          ]
        }
      ]
    };
  },
  methods: {
    toggleDays() {
      this.$refs.days.style.color = "white";
      this.$refs.days.style.background = "#56CCF2";
      this.$refs.days.style.borderRadius = "4px";

      this.$refs.weeks.style.color = "#5b6175";
      this.$refs.weeks.style.background = "none";
      this.$refs.weeks.style.borderRadius = "none";

      this.$refs.months.style.color = "#5b6175";
      this.$refs.months.style.background = "none";
      this.$refs.months.style.borderRadius = "none";
    },
    toggleWeeks() {
      this.$refs.weeks.style.color = "white";
      this.$refs.weeks.style.background = "#56CCF2";
      this.$refs.weeks.style.borderRadius = "4px";

      this.$refs.days.style.color = "#5b6175";
      this.$refs.days.style.background = "none";
      this.$refs.days.style.borderRadius = "none";

      this.$refs.months.style.color = "#5b6175";
      this.$refs.months.style.background = "none";
      this.$refs.months.style.borderRadius = "none";
    },
    toggleMonths() {
      this.$refs.months.style.color = "white";
      this.$refs.months.style.background = "#56CCF2";
      this.$refs.months.style.borderRadius = "4px";

      this.$refs.days.style.color = "#5b6175";
      this.$refs.days.style.background = "none";
      this.$refs.days.style.borderRadius = "none";

      this.$refs.weeks.style.color = "#5b6175";
      this.$refs.weeks.style.background = "none";
      this.$refs.weeks.style.borderRadius = "none";
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding-left: 15%;
  padding-right: 15%;
}

.spread {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  width: 100%;
}

h1.dark {
  @include heading-3($black);
}

h1.light {
  @include heading-3($white);
}

.toggle {
  @include medium-text;
  color: $dark-gray;
  height: 50px;
  width: 240px;
  border-radius: 6px;
  padding: 5px;
  display: flex;
  flex-wrap: nowrap;

  &:hover {
    cursor: pointer;
  }
}

@mixin toggle-settings {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
}

.days {
  @include toggle-settings;
  background: $teal;
  border-radius: 4px;
  color: $white;
}

.weeks {
  @include toggle-settings;
}

.months {
  @include toggle-settings;
}
</style>
