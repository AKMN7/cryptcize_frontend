<template>
  <div class="explore__main">
    <the-search-bar></the-search-bar>
    <the-table></the-table>
  </div>
</template>

<script>
import TheTable from "./TheTable.vue";
import TheSearchBar from "./TheSearchBar.vue";
import { useStore } from "vuex";

export default {
  components: {
    TheTable,
    TheSearchBar,
  },
  setup() {
    const store = useStore();
    store.commit("setHeaderText", "Explore");
  },
};
</script>

<style scoped>
@media only screen and (max-width: 58em) {
  .explore__main {
    padding: 0.5rem 2rem !important;
  }
}

.explore__main {
  padding: 1.5rem 3rem;
}
</style>