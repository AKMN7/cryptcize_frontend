<template>
  <div class="dashboard__item dashboard__item__fearOverview">
    <div class="grid__title">
      <span>Fear Overview</span>
      <button
        v-tippy="
          'An overall data of the fear and greed index. Showing current, yesterday, last week and last month fear percentages.'
        "
      >
        <ion-icon name="help-circle-outline" class="profile__icon"></ion-icon>
      </button>
    </div>

    <div class="overview__info">
      <div class="overview__info__item">
        <div class="viewName">Now</div>
        <div class="viewInfo">
          {{ fearAndGreed.now.value_class }}: {{ fearAndGreed.now.value }}%
        </div>
      </div>
      <div class="overview__info__item">
        <div class="viewName">Yesterday</div>
        <div class="viewInfo">
          {{ fearAndGreed.yesterday.value_class }}:
          {{ fearAndGreed.yesterday.value }}%
        </div>
      </div>
      <div class="overview__info__item">
        <div class="viewName">Last Week</div>
        <div class="viewInfo">
          {{ fearAndGreed.lastWeek.value_class }}:
          {{ fearAndGreed.lastWeek.value }}%
        </div>
      </div>
      <div class="overview__info__item lastItem">
        <div class="viewName">Last Month</div>
        <div class="viewInfo">
          {{ fearAndGreed.lastMonth.value_class }}:
          {{ fearAndGreed.lastMonth.value }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const fearAndGreed = computed(() => store.getters.getFearAndGreed).value;

    return { fearAndGreed };
  },
};
</script>