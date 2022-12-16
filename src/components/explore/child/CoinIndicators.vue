<template>
  <div class="exploreChild__item exploreChild__item__indicators">
    <div class="grid__title">
      <span>Indicators</span>
      <button v-tippy="boxTippy">
        <ion-icon name="help-circle-outline"></ion-icon>
      </button>
    </div>

    <div class="indicators__list">
      <div class="indicators__list__item" v-tippy="rsiTippy">
        <div class="indicatorName">RSI</div>
        <div class="indicatorValue">
          {{ indicators.rsi ? indicators.rsi : "--" }}
        </div>
        <div v-if="indicators.rsi > 70" class="indicatorAction greenText">
          BUY
        </div>
        <div v-else-if="indicators.rsi < 30" class="indicatorAction redText">
          SELL
        </div>
        <div v-else class="indicatorAction greyText">NEU</div>
      </div>
      <div class="indicators__list__item" v-tippy="macdTippy">
        <div class="indicatorName">MACD</div>
        <div class="indicatorValue">
          {{ indicators.macd.MACD ? indicators.macd.MACD.toFixed(4) : "--" }}
        </div>
        <div
          v-if="indicators.macd.MACD > indicators.macd.signal"
          class="indicatorAction greenText"
        >
          BUY
        </div>
        <div v-else class="indicatorAction redText">SELL</div>
      </div>
      <div class="indicators__list__item" v-tippy="sma50Tippy">
        <div class="indicatorName">SMA(50)</div>
        <div class="indicatorValue">
          {{ indicators.sma50 ? indicators.sma50.toFixed(2) : "--" }}
        </div>
        <div
          v-if="indicators.sma50 > indicators.sma100"
          class="indicatorAction greenText"
        >
          BUY
        </div>
        <div
          v-else-if="indicators.sma50 < indicators.sma100"
          class="indicatorAction redText"
        >
          SELL
        </div>
        <div v-else class="indicatorAction greyText">NEU</div>
      </div>
      <div class="indicators__list__item" v-tippy="sma100Tippy">
        <div class="indicatorName">SMA(100)</div>
        <div class="indicatorValue">
          {{ indicators.sma100 ? indicators.sma100.toFixed(2) : "--" }}
        </div>
        <div
          v-if="indicators.sma50 > indicators.sma100"
          class="indicatorAction greenText"
        >
          BUY
        </div>
        <div
          v-else-if="indicators.sma50 < indicators.sma100"
          class="indicatorAction redText"
        >
          SELL
        </div>
        <div v-else class="indicatorAction greyText">NEU</div>
      </div>
      <div class="indicators__list__item" v-tippy="ema50Tippy">
        <div class="indicatorName">EMA(50)</div>
        <div class="indicatorValue">
          {{ indicators.ema50 ? indicators.ema50.toFixed(2) : "--" }}
        </div>
        <div
          v-if="indicators.ema50 > indicators.ema100"
          class="indicatorAction greenText"
        >
          BUY
        </div>
        <div
          v-else-if="indicators.ema50 < indicators.ema100"
          class="indicatorAction redText"
        >
          SELL
        </div>
        <div v-else class="indicatorAction greyText">NEU</div>
      </div>
      <div class="indicators__list__item" v-tippy="ema100Tippy">
        <div class="indicatorName">EMA(100)</div>
        <div class="indicatorValue">
          {{ indicators.ema100 ? indicators.ema100.toFixed(2) : "--" }}
        </div>
        <div
          v-if="indicators.ema50 > indicators.ema100"
          class="indicatorAction greenText"
        >
          BUY
        </div>
        <div
          v-else-if="indicators.ema50 < indicators.ema100"
          class="indicatorAction redText"
        >
          SELL
        </div>
        <div v-else class="indicatorAction greyText">NEU</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["indicators"],
  setup() {
    const boxTippy =
      "Technincal inidicators are mathematical calculations that help traders identify certain signals and trends within the market.";
    const rsiTippy =
      "The Relative Strength Index (RSI) is a measurement used to assess the price momentum of a cryptocurrency. The basic idea behind the RSI is to measure how quickly traders are bidding the price of the coin up or down. The RSI plots this result on a scale of a 0 to 100. An assest is considered overbought when the RSI is above 70 and oversold when below 30.";
    const macdTippy =
      "The Moving Average Convergence/Divergence (MACD) is a popular crypto trading indicator often favored for its simplicity and ability to give strong trading signals. The MACD is a trend-following indicator that signals whether shorter-term price momentum is in the same direction as longer-term price momentum.";
    const sma50Tippy =
      "The Simple Moving Average (SMA) is simply the average price over the specified period.";
    const sma100Tippy =
      "The Simple Moving Average (SMA) is simply the average price over the specified period.";
    const ema50Tippy =
      "The Exponential Moving Average (EMA) is similar to Simple Moving Average (SMA), measuring trend direction over a period of time. However it applies more weight to data that is more current.";
    const ema100Tippy =
      "The Exponential Moving Average (EMA) is similar to Simple Moving Average (SMA), measuring trend direction over a period of time. However it applies more weight to data that is more current.";

    return {
      boxTippy,
      rsiTippy,
      macdTippy,
      sma50Tippy,
      sma100Tippy,
      ema50Tippy,
      ema100Tippy,
    };
  },
};
</script>

<style scoped>
.greyText {
  color: rgb(160, 160, 160);
}
</style>