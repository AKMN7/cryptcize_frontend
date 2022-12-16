<template>
  <div
    v-if="isLoading"
    class="loader_container"
    :class="{ darkBody: isDarkTheme }"
  >
    <div class="loader_img">
      <img src="../../../img/undraw_raining_re_4b55.svg" alt="Loading..." />
    </div>
    <div class="loader color-range"></div>
  </div>
  <div v-else class="exploreChild" :class="{ darkTheme: isDarkTheme }">
    <general-data :coinData="generalData"></general-data>
    <explore-child-line-chart :prices="coinPrices"></explore-child-line-chart>
    <gauge-chart :totalSupply="coinSupplyPercentage"></gauge-chart>
    <coin-indicators :indicators="coinIndicators"></coin-indicators>
    <latest-coin-posts
      @refreshFeed="refreshPosts"
      :coinPosts="coinPosts"
    ></latest-coin-posts>
    <new-post
      @refreshFeed="refreshPosts"
      :coinSymbol="generalData.symbol"
      :coinID="generalData.id"
    ></new-post>
  </div>
</template>

<script>
import GeneralData from "./GeneralData.vue";
import ExploreChildLineChart from "./ExploreChildLineChart.vue";
import CoinIndicators from "./CoinIndicators.vue";
import GaugeChart from "./GaugeChart";
import LatestCoinPosts from "./LatestCoinPosts.vue";
import NewPost from "./NewPost.vue";

export default {
  components: {
    GeneralData,
    ExploreChildLineChart,
    GaugeChart,
    CoinIndicators,
    LatestCoinPosts,
    NewPost,
  },
  data() {
    return {
      isLoading: false,
      isNotFound: false,
      generalData: {},
      coinPrices: [],
      coinSupplyPercentage: [0],
      coinIndicators: {},
      coinPosts: [],
    };
  },
  methods: {
    async refreshPosts() {
      try {
        this.coinPosts = await this.$store.dispatch(
          "getCoinPosts",
          this.generalData.symbol
        );
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Unable to refresh feed. Please try again later!",
          showConfirmButton: false,
          toast: true,
          position: "top",
          timer: 2000,
        });
      }
    },
  },
  computed: {
    isDarkTheme() {
      return this.$store.getters.isDarkTheme;
    },
  },
  async created() {
    try {
      this.isLoading = true;

      const coinData = await this.$store.dispatch(
        "getCoinInfo",
        this.$route.params.coinID
      );

      this.coinPosts = await this.$store.dispatch(
        "getCoinPosts",
        coinData.symbol
      );

      this.isLoading = false;

      this.$store.commit("setHeaderText", `Explore - ${coinData.name}`);

      this.generalData = {
        logo: coinData.logo,
        name: coinData.name,
        id: coinData.id,
        symbol: coinData.symbol,
        price: coinData.price.toFixed(2),
        priceChange: coinData.priceChange.toFixed(2),
        marketCap: converter(coinData.marketCap),
        volume: converter(coinData.volume),
        volumeChange: coinData.volumeChange.toFixed(3),
      };

      this.coinPrices = [
        {
          name: "Price",
          data: coinData.priceCharts,
        },
      ];

      this.coinSupplyPercentage = [
        ((coinData.circulatingSupply * 100) / coinData.maxSupply).toFixed(2),
      ];

      this.coinIndicators = coinData.indicators;
      // console.log("Indicators ->", this.coinIndicators);
    } catch (error) {
      console.log("Entererd Two");
      console.log(error);
      setTimeout(() => {
        this.isLoading = false;
      }, 4000);

      this.$swal.fire({
        icon: "error",
        title:
          "Unable to fetch sufficent data for your coin selection. Please try with a different coin!",
        showConfirmButton: false,
        toast: true,
        position: "top",
        timer: 4000,
      });

      // this.$router.replace("/app/dashboard");
      this.$router.go(-1);
    }

    function converter(val) {
      if (Math.abs(Number(val)) >= 1.0e12)
        return (Math.abs(Number(val)) / 1.0e12).toFixed(2) + "T";
      if (Math.abs(Number(val)) >= 1.0e9)
        return (Math.abs(Number(val)) / 1.0e9).toFixed(2) + "B";
      if (Math.abs(Number(val)) >= 1.0e6)
        return (Math.abs(Number(val)) / 1.0e6).toFixed(2) + "M";
    }
  },
};
</script>