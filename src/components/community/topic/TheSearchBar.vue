<template>
  <div class="search_box">
    <input
      type="text"
      placeholder="Search for a topic by name or code."
      spellcheck="true"
      v-model="searchPhrase"
    />
    <button class="lzt_btn" :class="{ loading: loading }" @click="navigatePage">
      <ion-icon name="search-outline"></ion-icon>
    </button>
  </div>
</template>

<script>
// import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  props: ["loading"],
  emits: ["searchTopic"],
  setup(_, context) {
    // const router = useRouter();
    let searchPhrase = ref("");
    function navigatePage() {
      console.log("PRESSED NAVIAGATE PAGE");
      context.emit("searchTopic", searchPhrase.value);
      searchPhrase.value = "";
    }

    return { searchPhrase, navigatePage };
  },
};
</script>