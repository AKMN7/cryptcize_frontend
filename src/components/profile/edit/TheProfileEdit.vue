<template>
  <div class="profile">
    <div class="profile__wrapper">
      <personal-form></personal-form>
      <security-form></security-form>
    </div>
  </div>
</template>

<script>
import PersonalForm from "./PersonalForm.vue";
import SecurityForm from "./SecurityForm.vue";
import { useStore } from "vuex";
export default {
  components: {
    PersonalForm,
    SecurityForm,
  },
  setup() {
    const store = useStore();
    store.commit("setHeaderText", "Edit Profile");
  },
};
</script>