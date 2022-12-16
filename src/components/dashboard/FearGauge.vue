<template>
  <div class="dashboard__item dashboard__item__fearGauge">
    <div class="grid__title">
      <span>Fear Gauge</span>
      <button
        v-tippy="
          'A Gauge representation of the current fear and greed index (Thoughts of the market). The Maximum Fear indicator is 100, and the Minimum is 0.'
        "
      >
        <ion-icon name="help-circle-outline" class="profile__icon"></ion-icon>
      </button>
    </div>

    <apexchart
      type="radialBar"
      height="375"
      :options="gaugeOptions"
      :series="[value]"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import GaugeChart from "../../configs/apexchart/GaugeChart";
import { computed, ref, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const store = useStore();
    const fearAndGreed = computed(() => store.getters.getFearAndGreed).value;
    let isDarkTheme = computed(() => store.getters.isDarkTheme);

    let gaugeOptions = ref(
      GaugeChart.GuageChartOptions(
        isDarkTheme.value,
        fearAndGreed.now.value_class
      )
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
        labels: [
          fearAndGreed.now.value_class != null
            ? fearAndGreed.now.value_class
            : "---",
        ],
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

    return {
      gaugeOptions,
      value: parseInt(fearAndGreed.now.value),
    };
  },
};
</script>