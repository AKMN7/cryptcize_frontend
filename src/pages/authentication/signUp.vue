<template>
  <div class="auth">
    <div class="auth__wrapper">
      <div class="auth__wrapper__illust">
        <div class="auth__wrapper__illust__text">
          <h2>Sign Up Now.</h2>
          <h3>And Start Looking Into Crypto.</h3>
        </div>
        <img src="../../img/signup.svg" alt="Cryptcize" />
      </div>
      <div class="auth__wrapper__form">
        <form @submit.prevent="signUp" class="form">
          <div class="form__group">
            <h2 class="form__title">Sign Up.</h2>
          </div>

          <div class="form__group">
            <input
              type="text"
              class="form__input"
              placeholder="Full Name"
              id="name"
              spellcheck="false"
              required
              v-model="name"
            />
            <label for="name" class="form__label">Full Name</label>
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
              Sign Up
            </button>
          </div>

          <div class="form__group">
            <span class="form__question">Already have an account? </span>
            <router-link to="/signin" class="form__link">Sign In</router-link>
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
    let name = ref("");
    let email = ref("");
    let password = ref("");
    let passwordConfirm = ref("");

    async function signUp() {
      const data = {
        name: name.value,
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      };

      isLoading.value = true;

      try {
        await store.dispatch("signUp", data);
        toaster.fireToast(swal, true, "Sign Up Success");
        setTimeout(() => {
          router.replace("/app/dashboard");
        }, 2000);
      } catch (error) {
        toaster.fireToast(swal, false, error.message);
      }

      isLoading.value = false;
    }

    return {
      isLoading,
      signUp,
      name,
      email,
      password,
      passwordConfirm,
    };
  },
};
</script>