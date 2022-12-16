<template>
  <div class="auth">
    <div class="auth__wrapper">
      <div class="auth__wrapper__form">
        <form @submit.prevent="sendEmail" class="form">
          <div class="form__group">
            <h2 class="form__title">Forgot Password.</h2>
          </div>

          <div class="form__group">
            <input
              type="email"
              class="form__input"
              placeholder="E-mail"
              id="email"
              spellcheck="false"
              required
              v-model="email"
            />
            <label for="email" class="form__label">E-Mail</label>
          </div>

          <div class="form__group">
            <button class="form__btn" :class="{ loading: isLoading }">
              Submit
            </button>
          </div>

          <div class="form__group">
            <router-link to="/signin" class="form__link">
              Back to Sign In
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { inject } from "@vue/runtime-core";
import { ref } from "vue";
import toaster from "../../configs/toaster/toast";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");

    let isLoading = ref(false);
    let email = ref("");

    async function sendEmail() {
      const data = {
        email: email.value,
      };

      isLoading.value = true;

      try {
        await store.dispatch("forgotPassword", data);

        toaster.fireToast(
          swal,
          true,
          "An Email was sent to you, plase check you inbox for further instructions.",
          5000
        );

        setTimeout(() => {
          router.forward("/signin");
        }, 3000);
      } catch (error) {
        toaster.fireToast(swal, false, error.message);
      }

      isLoading.value = false;
    }

    return {
      isLoading,
      sendEmail,
      email,
    };
  },
};
</script>