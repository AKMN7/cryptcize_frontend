<template>
  <div class="exploreChild__item exploreChild__item__gaugeChart">
    <div class="grid__title">
      <span>Market Supply</span>
      <button v-tippy="tippyText">
        <ion-icon name="help-circle-outline" class="profile__icon"></ion-icon>
      </button>
    </div>

    <apexchart
      type="radialBar"
      height="375"
      :options="gaugeOptions"
      :series="totalSupply"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import GaugeChart from "../../../configs/apexchart/GaugeChart.js";
import { computed, ref, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["totalSupply"],
  setup() {
    const store = useStore();
    let isDarkTheme = computed(() => store.getters.isDarkTheme);

    let gaugeOptions = ref(
      GaugeChart.GuageChartOptions(isDarkTheme.value, "Coin Supply")
    );

    watchEffect(() => {
      gaugeOptions.value = {
        chart: {
          type: "radialBar",
          offsetY: -30,
          sparkline: {
            enabled: true,
          },
          background: "transparent",
          fontFamily: "Lato, sans-serif",
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            track: {
              background: "#e7e7e7",
              strokeWidth: "85%",
              margin: 1,
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                offsetY: 20,
                fontSize: "28px",
                fontWeight: 700,
                color: isDarkTheme.value ? "#EEEEEE" : "#22233C",
                formatter: function (val) {
                  if (val == Infinity) return "Infinity";
                  if (isNaN(val)) return "Unkown";
                  return val + "%";
                },
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 0.9,
            opacityTo: 1,
            stops: [0, 50, 73, 91],
          },
        },
        labels: ["Circulating Supply"],
        theme: {
          mode: isDarkTheme.value ? "dark" : "light",
          monochrome: {
            enabled: true,
            color: "#7920FF",
            shadeTo: "light",
            shadeIntensity: 0.1,
          },
        },
      };
    });

    const tippyText =
      "A gauge representation of the total percentage of the amount of coins that are circulating in the market and are in public hands.";

    return {
      gaugeOptions,
      tippyText,
    };
  },
};
</script>