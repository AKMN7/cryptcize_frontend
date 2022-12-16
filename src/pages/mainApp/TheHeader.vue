<template>
  <div class="header" :class="{ headerDarkTheme: isDarkTheme }">
    <div class="header__item">
      <label id="burger" for="view_toggle">
        <div></div>
        <div></div>
        <div></div>
      </label>
      <span class="page__title">{{ headerText }}</span>
    </div>
    <div class="header__item">
      <div class="header__item__icon" @click="openProfilePage">
        <ion-icon name="person-circle-outline" class="profile__icon"></ion-icon>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const headerText = computed(() => store.getters.headerText);

    function openProfilePage() {
      router.push("/app/profile");
    }

    let isDarkTheme = computed(() => store.getters.isDarkTheme);

    return {
      openProfilePage,
      headerText,
      isDarkTheme,
    };
  },
};
</script>

<style scoped>
.headerDarkTheme {
  background-color: #1b1c2f !important;
  color: #ffffff;
}

.headerDarkTheme #burger > div {
  background-color: #ffffff !important;
}
</style>