<template>
  <div class="community__item community__item__topFavCoins">
    <div id="chart" class="topFavsChart">
      <apexchart
        type="bar"
        height="315"
        :options="chartOptions"
        :series="coinLikes"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import TopFavs from "../../../configs/apexchart/TopFavs";
import { computed, ref, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["mostLiked"],
  setup(props) {
    const store = useStore();
    let isDarkTheme = computed(() => store.getters.isDarkTheme);

    let coinNames = [];
    let coinLikesNum = [];

    props.mostLiked.forEach((el) => {
      coinNames.push(el.coin.toUpperCase());
      coinLikesNum.push(el.total);
    });

    let chartOptions = ref(
      TopFavs.TopFavsChartOptions(coinNames, isDarkTheme.value)
    );

    watchEffect(() => {
      chartOptions.value = {
        chart: {
          height: 325,
          type: "bar",
        },
        title: {
          text: "Top Favourites",
          align: "left",
          style: {
            fontSize: "18px",
            fontWeight: "400",
            fontFamily: "Lato, sans-serif",
            color: isDarkTheme.value ? "#EEEEEE" : "#22233C",
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "40%",
            distributed: true,
            borderRadius: 5,
          },
        },
        colors: ["#7920ff"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        labels: coinNames,
        xaxis: {
          labels: {
            style: {
              fontSize: 12,
              color: "#FFFFFF",
            },
          },
        },
        yaxis: {
          show: false,
        },
      };
    });

    const coinLikes = [
      {
        name: "Total Likes",
        data: coinLikesNum,
      },
    ];

    return { chartOptions, coinLikes };
  },
};
</script>

<style scoped>
.topFavsChart {
  height: 100%;
  margin-left: -10px;
}
</style>