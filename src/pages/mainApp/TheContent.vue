<template>
  <section class="main__content">
    <the-header></the-header>
    <!-- <the-dashboard></the-dashboard> -->
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </section>
</template>

<script>
import TheHeader from "./TheHeader.vue";
import TheDashboard from "../../components/dashboard/TheDashboard.vue";
export default {
  components: {
    TheHeader,
    TheDashboard,
  },
};
</script>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(-75px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(75px);
}

.route-enter-active {
  transition: all 0.1s;
}
.route-leave-active {
  transition: all 0.1s;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>