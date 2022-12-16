<template>
  <div class="profile__wrapper__form">
    <form @submit.prevent="saveData" class="form">
      <div class="form__group">
        <h2 class="form__title">Security Info.</h2>
      </div>

      <div class="form__group">
        <input
          type="password"
          class="form__input"
          placeholder="Current Password"
          id="currentpassword"
          required
          minlength="8"
          v-model="currentPassword"
        />
        <label for="currentpassword" class="form__label"
          >Current Passowrd</label
        >
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
        <label for="password" class="form__label">New Passowrd</label>
      </div>

      <div class="form__group">
        <input
          type="password"
          class="form__input"
          placeholder="Confirm Password"
          id="cpassword"
          required
          minlength="8"
          v-model="cpassword"
        />
        <label for="cpassword" class="form__label">Confirm Passowrd</label>
      </div>

      <div class="form__group">
        <button class="form__btn" :class="{ loading: isLoading }">
          Save Security Info
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { inject } from "@vue/runtime-core";
import { ref } from "vue";
import toaster from "../../../configs/toaster/toast";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");

    let isLoading = ref(false);
    let currentPassword = ref("");
    let password = ref("");
    let cpassword = ref("");

    async function saveData() {
      const newData = {
        currentPassword: currentPassword.value,
        password: password.value,
        passwordConfirm: cpassword.value,
      };

      isLoading.value = true;

      try {
        await store.dispatch("updateSecurity", newData);
        await store.dispatch("logout");

        toaster.fireToast(
          swal,
          true,
          "Password Updated Successfully, Please sign in again for security reasons.",
          4000
        );

        setTimeout(() => {
          router.replace("/signin");
        }, 4000);
      } catch (error) {
        toaster.fireToast(swal, false, error.message);
      }

      isLoading.value = false;
    }

    return {
      isLoading,
      currentPassword,
      password,
      cpassword,
      saveData,
    };
  },
};
</script>