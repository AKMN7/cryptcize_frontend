<template>
  <div class="auth">
    <div class="auth__wrapper">
      <div class="auth__wrapper__form">
        <form @submit.prevent="updatePassword" class="form">
          <div class="form__group">
            <h2 class="form__title">Reset Password.</h2>
          </div>

          <div class="form__group">
            <input
              type="password"
              class="form__input"
              placeholder="New Password"
              id="password"
              required
              minlength="8"
              v-model="password"
            />
            <label for="password" class="form__label">Passowrd</label>
          </div>

          <div class="form__group">
            <input
              type="password"
              class="form__input"
              placeholder="Confirm Password"
              id="cpassword"
              required
              minlength="8"
              v-model="passwordConfirm"
            />
            <label for="cpassword" class="form__label">Confirm Passowrd</label>
          </div>

          <div class="form__group">
            <button class="form__btn" :class="{ loading: isLoading }">
              Reset Password
            </button>
          </div>

          <div class="form__group">
            <router-link to="/signin" class="form__link">
              Back to Login
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { inject } from "@vue/runtime-core";
import { ref } from "vue";
import toaster from "../../configs/toaster/toast";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const swal = inject("$swal");

    let isLoading = ref(false);
    let password = ref("");
    let passwordConfirm = ref("");

    // console.log("This is the reset route token ->", route.params.token);

    async function updatePassword() {
      const data = {
        resetToken: route.params.token,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      };

      isLoading.value = true;

      try {
        await store.dispatch("resetPassword", data);

        toaster.fireToast(swal, true, "Password Updated!");

        setTimeout(() => {
          console.log("Shout Go To Sign In");
          router.push("/signin");
        }, 2000);
      } catch (error) {
        toaster.fireToast(swal, false, error.message, 4000);
      }

      isLoading.value = false;
    }

    return {
      isLoading,
      updatePassword,
      password,
      passwordConfirm,
    };
  },
};
</script>