<template>
  <section class="sidebar" :class="{ darkSidebar: isDarkTheme }">
    <div class="sidebar__title">
      <img src="../../img/Cryptcize_Logo.png" alt="Logo" />
    </div>

    <div class="sidebar__links">
      <side-bar-link
        target="/app/dashboard"
        text="Dashboard"
        icon="podium"
      ></side-bar-link>
      <side-bar-link
        target="/app/explore"
        text="Explore"
        icon="search"
      ></side-bar-link>
      <!-- <side-bar-link
        target="/app/favs"
        text="Favourites"
        icon="heart"
      ></side-bar-link> -->
      <side-bar-link
        target="/app/community"
        text="Community"
        icon="chatbubble"
      ></side-bar-link>
    </div>

    <div class="sidebar__links">
      <pop-up-button type="logout"></pop-up-button>
      <!-- <pop-up-button type="support"></pop-up-button> -->
      <dark-mode-toggle></dark-mode-toggle>
    </div>
  </section>
</template>

<script>
import SideBarLink from "../../components/other/SideBarLink.vue";
import DarkModeToggle from "../../components/other/DarkModeToggle.vue";
import PopUpButton from "../../components/other/PopUpButton.vue";

import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    DarkModeToggle,
    SideBarLink,
    PopUpButton,
  },
  setup() {
    const store = useStore();
    let isDarkTheme = computed(() => store.getters.isDarkTheme);
    return { isDarkTheme };
  },
};
</script>

<style scoped>
.darkSidebar {
  box-shadow: none !important;
}
</style>