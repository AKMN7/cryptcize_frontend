<template>
  <div class="link" v-if="type == 'support'" @click="showPopUp">
    <a>
      <ion-icon name="call-outline" class="link__icon"></ion-icon>
      <span class="link__name">Support</span>
    </a>
  </div>
  <div class="link" v-if="type == 'logout'" @click="showPopUp">
    <a>
      <ion-icon name="log-out-outline" class="link__icon"></ion-icon>
      <span class="link__name">Logout</span>
    </a>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { inject } from "@vue/runtime-core";
import toaster from "../../configs/toaster/toast";

export default {
  props: ["type"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");

    function showPopUp() {
      if (props.type == "logout") logoutPopUp();
      if (props.type == "support") supportPopUp();
    }

    // Log Out Handler
    function logoutPopUp() {
      swal.fire(toaster.logOutPopUpOptions()).then((result) => {
        if (result.isConfirmed) {
          store.dispatch("logout");
          toaster.fireToast(swal, true, "Log Out Success");
          setTimeout(() => {
            router.replace("/");
          }, 1000);
        }
      });
    }

    // Support Handler
    function supportPopUp() {
      swal.fire(toaster.suuportPopUpOptions()).then((result) => {
        if (result.value) {
          console.log(result.value);
        }
      });
    }

    return { showPopUp };
  },
};
</script>