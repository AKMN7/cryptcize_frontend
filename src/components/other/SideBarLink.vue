<template>
  <div class="link">
    <router-link :to="target">
      <ion-icon :name="icon + '-outline'" class="link__icon"></ion-icon>
      <span class="link__name">{{ text }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["target", "text", "icon"],
};
</script>