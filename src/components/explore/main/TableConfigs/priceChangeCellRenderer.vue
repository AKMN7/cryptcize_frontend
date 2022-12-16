<template>
  <div class="table-icon-text">
    <ion-icon
      v-if="price_change >= 0"
      name="caret-up-outline"
      class="top-coin-change-icon greenText"
    ></ion-icon>
    <ion-icon
      v-else
      name="caret-down-outline"
      class="top-coin-change-icon redText"
    ></ion-icon>

    <span v-if="price_change >= 0" class="top-coin-change-text greenText"
      >{{ price_change.toFixed(2) }}%</span
    >
    <span v-else class="top-coin-change-text redText"
      >{{ price_change.toFixed(2) }}%</span
    >
  </div>
</template>

<script>
export default {
  setup(props) {
    return {
      price_change: props.params.data.price_change,
    };
  },
};
</script>

<style scoped>
.table-icon-text {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.table-icon-text ion-icon {
  margin-right: 10px;
  font-size: 2rem;
}

.greenText {
  color: green;
}

.redText {
  color: red;
}
</style>
