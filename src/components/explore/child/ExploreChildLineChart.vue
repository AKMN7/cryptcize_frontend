<template>
  <div class="exploreChild__item exploreChild__item__lineChart">
    <div id="chart" class="marketCapChart">
      <apexchart
        type="area"
        height="315"
        :options="chartOptions"
        :series="prices"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import CoinChart from "../../../configs/apexchart/CoinChart";
import { computed, ref, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["prices"],
  setup() {
    const store = useStore();
    let isDarkTheme = computed(() => store.getters.isDarkTheme);

    let chartOptions = ref(CoinChart.CoinChartOptions(isDarkTheme.value));

    watchEffect(() => {
      chartOptions.value = {
        chart: {
          type: "area",
          background: "transparent",
          zoom: {
            autoScaleYaxis: true,
          },
        },
        title: {
          text: "Price Overview",
          align: "left",
          style: {
            fontSize: "18px",
            fontWeight: "400",
            fontFamily: "Lato, sans-serif",
            color: isDarkTheme.value ? "#EEEEEE" : "#22233C",
          },
        },
        xaxis: {
          type: "datetime",
          tickAmount: 12,
          labels: {
            style: {
              fontSize: "12px",
              fontFamily: "Lato, sans-serif",
              fontWeight: 400,
              color: isDarkTheme.value ? "#22233C" : "#EEEEEE",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: true,
          tickAmount: 4,
          labels: {
            style: {
              fontSize: "12px",
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              color: isDarkTheme.value ? "#22233C" : "#EEEEEE",
            },
            formatter: function (val) {
              if (Math.abs(Number(val)) >= 1.0e12)
                return (Math.abs(Number(val)) / 1.0e12).toFixed(2) + "T";
              if (Math.abs(Number(val)) >= 1.0e9)
                return (Math.abs(Number(val)) / 1.0e9).toFixed(2) + "B";
              if (Math.abs(Number(val)) >= 1.0e6)
                return (Math.abs(Number(val)) / 1.0e6).toFixed(2) + "M";
              if (Math.abs(Number(val)) >= 1.0e3)
                return (Math.abs(Number(val)) / 1.0e3).toFixed(2) + "K";
              return val.toFixed(3);
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        grid: {
          padding: {
            left: 15,
          },
        },
        colors: ["#7920FF"],
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.7,
            opacityTo: 0.275,
          },
        },
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
      chartOptions,
    };
  },
};
</script>

<style scoped>
.marketCapChart {
  height: 100%;
  margin-left: -10px;
}
</style>