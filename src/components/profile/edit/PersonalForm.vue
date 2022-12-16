<template>
  <div class="profile__wrapper__form">
    <form @submit.prevent="saveData" class="form">
      <div class="form__group">
        <h2 class="form__title">Personal Info.</h2>
      </div>

      <div class="form__group">
        <input
          type="email"
          class="form__input"
          placeholder="E-mail"
          id="currentemail"
          spellcheck="false"
          required
          v-model="email"
          disabled
        />
        <label for="email" class="form__label">E-mail</label>
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
          type="number"
          class="form__input"
          placeholder="Age"
          id="age"
          spellcheck="false"
          required
          min="12"
          max="90"
          v-model="age"
        />
        <label for="age" class="form__label">Age</label>
      </div>

      <div class="form__group">
        <input
          type="text"
          class="form__input"
          placeholder="Country"
          id="country"
          spellcheck="false"
          required
          v-model="country"
        />
        <label for="country" class="form__label">Country</label>
      </div>

      <div class="form__group">
        <button class="form__btn" :class="{ loading: isLoading }">
          Save Personal Info
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import { useStore } from "vuex";
import { inject } from "@vue/runtime-core";
import { ref } from "vue";
import toaster from "../../../configs/toaster/toast";

export default {
  setup() {
    const store = useStore();
    const swal = inject("$swal");

    let isLoading = ref(false);
    let email = ref(store.getters.user.email);
    let name = ref(store.getters.user.name);
    let age = ref(store.getters.user.age);
    let country = ref(store.getters.user.country);

    async function saveData() {
      const newData = {
        name: name.value,
        age: age.value,
        country: country.value,
      };

      isLoading.value = true;

      try {
        await store.dispatch("updatePersonal", newData);
        toaster.fireToast(swal, true, "Personal Info Updated.");
      } catch (error) {
        toaster.fireToast(swal, false, error.message);
      }

      isLoading.value = false;
    }

    return {
      isLoading,
      email,
      name,
      age,
      country,
      saveData,
    };
  },
};
</script>