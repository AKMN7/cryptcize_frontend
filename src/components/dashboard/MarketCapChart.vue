<template>
  <div class="dashboard__item dashboard__item__marketCapChart">
    <div id="chart" class="marketCapChart">
      <apexchart
        type="area"
        height="315"
        :options="chartOptions"
        :series="finalMarketCaps"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import MarketCap from "../../configs/apexchart/MarketCap.js";
import { computed, ref, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["series"],
  setup() {
    const store = useStore();
    const btcMC = computed(() => store.getters.getbtcMC).value.market_caps;
    let isDarkTheme = computed(() => store.getters.isDarkTheme);

    let dates = [];
    let marketCaps = [];

    btcMC.forEach((el) => {
      const date = new Date(el[0]);
      dates.push(date.getDate() + "/" + (date.getMonth() + 1));
      marketCaps.push(parseInt(el[1]).toFixed(2));
    });

    let chartOptions = ref(
      MarketCap.MarketCapChartOptions(dates, isDarkTheme.value)
    );

    watchEffect(() => {
      chartOptions.value = {
        chart: {
          type: "area",
          background: "transparent",
        },
        title: {
          text: "Bitcoin Market Cap",
          align: "left",
          style: {
            fontSize: "18px",
            fontWeight: "400",
            fontFamily: "Lato, sans-serif",
            color: isDarkTheme.value ? "#EEEEEE" : "#22233C",
          },
        },
        xaxis: {
          type: "category",
          categories: dates,
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

    const finalMarketCaps = [
      {
        name: "Market Cap",
        data: marketCaps,
      },
    ];

    return { chartOptions, finalMarketCaps };
  },
};
</script>

<style scoped>
.marketCapChart {
  height: 100%;
  margin-left: -10px;
}
</style>