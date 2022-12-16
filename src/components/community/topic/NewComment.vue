<template>
  <div class="comment_box">
    <input
      type="text"
      placeholder="Share your thoughts about this discussion."
      spellcheck="true"
      v-model="text"
    />
    <button
      class="lzt_btn"
      :class="{ loading: isLoading }"
      @click="postComment"
    >
      <ion-icon name="paper-plane-outline"></ion-icon>
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { inject } from "@vue/runtime-core";
import toaster from "../../../configs/toaster/toast";

export default {
  props: ["topicID"],
  emits: ["refreshComments"],
  setup(props, context) {
    const swal = inject("$swal");
    const store = useStore();

    let isLoading = ref(false);
    let text = ref("");

    async function postComment() {
      const data = {
        topicID: props.topicID,
        text: text.value,
      };

      isLoading.value = true;

      try {
        await store.dispatch("addComment", data);
        toaster.fireToast(swal, true, "Post Published Successfully!");
        context.emit("refreshComments");
      } catch (error) {
        toaster.fireToast(swal, false, error.message);
      }

      text.value = "";
      isLoading.value = false;
    }

    return {
      isLoading,
      text,
      postComment,
    };
  },
};
</script>