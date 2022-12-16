<template>
  <div class="exploreChild__item exploreChild__item__createPost">
    <div class="grid__title">
      <span>Post Your Opinion</span>
    </div>

    <div class="newPost">
      <div class="newPost__form">
        <form @submit.prevent="postOpinion" class="form">
          <div class="form__group selection">
            <input
              type="radio"
              name="select"
              id="option-1"
              value="bullish"
              v-model="postType"
              checked
            />
            <input
              type="radio"
              name="select"
              id="option-2"
              value="bearish"
              v-model="postType"
            />
            <label for="option-1" class="option option-1">
              <div class="dot"></div>
              <span>Bullish</span>
            </label>
            <label for="option-2" class="option option-2">
              <div class="dot"></div>
              <span>Bearish</span>
            </label>
          </div>

          <div class="form__group">
            <input
              type="text"
              class="form__input"
              :placeholder="'$' + coinSymbol.toUpperCase()"
              id="coin"
              spellcheck="false"
              disabled
              required
            />
          </div>

          <div class="form__group">
            <input
              type="text"
              class="form__input"
              :placeholder="`What's happening on ${coinSymbol} ?`"
              id="text"
              spellcheck="false"
              v-model="text"
              required
            />
          </div>

          <div class="form__group">
            <button class="form__btn" :class="{ loading: isLoading }">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { inject } from "@vue/runtime-core";
import toaster from "../../../configs/toaster/toast";
export default {
  props: ["coinSymbol", "coinID"],
  emits: ["refreshFeed"],
  setup(props, context) {
    const swal = inject("$swal");
    const store = useStore();

    let isLoading = ref(false);

    let postType = ref("bullish");
    let text = ref("");

    async function postOpinion() {
      const data = {
        coinName: props.coinSymbol.toLowerCase(),
        postType: postType.value,
        text: text.value,
      };

      isLoading.value = true;

      try {
        await store.dispatch("addPost", data);
        toaster.fireToast(swal, true, "Post Published Successfully!");
        context.emit("refreshFeed");
      } catch (error) {
        toaster.fireToast(swal, false, error.message);
      }

      postType.value = "bullish";
      text.value = "";
      isLoading.value = false;
    }

    return {
      isLoading,
      postType,
      text,
      postOpinion,
    };
  },
};
</script>