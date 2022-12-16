<template>
  <div class="community__item community__item__createTopic">
    <div class="grid__title">
      <span>Create Your Own Topic</span>
    </div>

    <div class="newTopic">
      <div class="newTopic__form">
        <form @submit.prevent="startNewTopic" class="form">
          <div class="form__group">
            <input
              type="text"
              class="form__input"
              placeholder="Topic Title"
              id="coin"
              spellcheck="true"
              minlength="10"
              required
              v-model="topicName"
            />
          </div>

          <div class="form__group">
            <button class="form__btn" :class="{ loading: isLoading }">
              Create Topic
            </button>
          </div>
        </form>
      </div>
      <div class="newTopic__img">
        <img src="../../../img/chat.svg" alt="" />
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { inject } from "@vue/runtime-core";
import toaster from "../../../configs/toaster/toast";
import { useRouter } from "vue-router";

export default {
  setup() {
    const swal = inject("$swal");
    const store = useStore();
    const router = useRouter();

    let isLoading = ref(false);

    let topicName = ref("");

    async function startNewTopic() {
      const data = {
        topicName: topicName.value,
      };

      isLoading.value = true;

      try {
        // Call addPost (Vuex) function
        let newTopic = await store.dispatch("createTopic", data);
        toaster.fireToast(swal, true, "Topic Published Successfully!");
        setTimeout(() => {
          router.push(`/app/community/${newTopic.topicCode}`);
        }, 2000);
        console.log(newTopic);
      } catch (error) {
        // Display error message
        toaster.fireToast(swal, false, error.message);
      }

      // Reset Form Input Fields
      topicName.value = "";
      isLoading.value = false;
    }
    return {
      isLoading,
      topicName,
      startNewTopic,
    };
  },
};
</script>