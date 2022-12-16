<template>
  <section class="main_app">
    <input type="checkbox" id="view_toggle" />
    <the-side-bar></the-side-bar>
    <the-content></the-content>
  </section>
</template>

<script>
import TheContent from "./TheContent.vue";
import TheSideBar from "./TheSideBar.vue";
export default {
  components: {
    TheContent,
    TheSideBar,
  },
};
</script>