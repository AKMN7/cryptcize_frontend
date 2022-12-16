<template>
  <div class="auth">
    <div class="auth__wrapper">
      <div class="auth__wrapper__illust">
        <div class="auth__wrapper__illust__text">
          <h2>Start Your Journey.</h2>
          <h3>Cryptcize Yourself For The Future.</h3>
        </div>
        <img src="../../img/signin.svg" alt="Cryptcize" />
      </div>
      <div class="auth__wrapper__form">
        <form @submit.prevent="signIn" class="form">
          <div class="form__group">
            <h2 class="form__title">Sign In.</h2>
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
            <input
              type="password"
              class="form__input"
              placeholder="Password"
              id="password"
              required
              minlength="8"
              v-model="password"
            />
            <label for="password" class="form__label">Passowrd</label>
          </div>

          <div class="form__group form__chk">
            <input
              type="checkbox"
              class="form__input-check"
              id="chkbox"
              v-model="keepSignedIn"
              checked
            />
            <label for="chkbox" class="form__label-check"> Remember Me </label>
            <router-link to="/forgot">Forgot Password?</router-link>
          </div>

          <div class="form__group">
            <button class="form__btn" :class="{ loading: isLoading }">
              Sign In
            </button>
          </div>

          <div class="form__group">
            <span class="form__question">Don't have an account? </span>
            <router-link to="/signup" class="form__link">Sign Up</router-link>
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
    // Declare imported variables
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");
    // Declare scope variables
    let isLoading = ref(false);
    let email = ref("");
    let password = ref("");
    let keepSignedIn = ref(true);

    // Sign In function
    async function signIn() {
      const data = {
        email: email.value,
        password: password.value,
        keepSignedIn: keepSignedIn.value,
      };

      // Display loading spinner
      isLoading.value = true;

      try {
        // Call vuex signIn function and await response
        await store.dispatch("signIn", data);
        toaster.fireToast(swal, true, "Sign In Success");
        setTimeout(() => {
          router.replace("/app/dashboard");
        }, 2000);
      } catch (error) {
        // Show error message
        toaster.fireToast(swal, false, "Invalid Credentials!");
      }

      // Hide loading spinner
      isLoading.value = false;
    }

    return {
      isLoading,
      signIn,
      email,
      password,
      keepSignedIn,
    };
  },
};
</script>