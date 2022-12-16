<template>
  <div class="toggle__box">
    <label
      for="toggle_button"
      :class="{ active: isActive }"
      class="toggle__button"
    >
      <span v-if="isActive" class="toggle__label">
        <ion-icon name="moon-outline" class="link__icon"></ion-icon>
      </span>
      <span v-if="!isActive" class="toggle__label">
        <ion-icon name="sunny-outline" class="link__icon"></ion-icon>
      </span>

      <input type="checkbox" id="toggle_button" v-model="checkedValue" />
      <span class="toggle__switch"></span>
    </label>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentState: false,
    };
  },
  computed: {
    isActive() {
      return this.currentState;
    },
    checkedValue: {
      get() {
        return this.currentState;
      },
      set(newValue) {
        this.currentState = newValue;
        this.$store.commit("toggleDarkTheme");
      },
    },
  },
  mounted() {
    this.currentState = this.$store.getters.isDarkTheme;
  },
};
</script>

<style scoped>
.toggle__box {
  color: #eeeeee;
  font-size: 1.8rem;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  padding: 1rem 2.2rem;
  text-align: left;
}

.toggle__button {
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.toggle__button input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  width: 1px;
  height: 1px;
}
.toggle__button .toggle__switch {
  display: inline-block;
  height: 12px;
  border-radius: 6px;
  width: 40px;
  background: #bfcbd9;
  box-shadow: inset 0 0 1px #bfcbd9;
  position: relative;
  margin-left: 10px;
  transition: all 0.25s;
}
.toggle__button .toggle__switch::after,
.toggle__button .toggle__switch::before {
  content: "";
  position: absolute;
  display: block;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  left: 0;
  top: -3px;
  transform: translateX(0);
  transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
}
.toggle__button .toggle__switch::after {
  background: #4d4d4d;
  box-shadow: 0 0 1px #666;
}
.toggle__button .toggle__switch::before {
  background: #4d4d4d;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  opacity: 0;
}
.active .toggle__switch {
  background: #a36bf8;
  box-shadow: inset 0 0 1px #7920ff;
}
.active .toggle__switch::after,
.active .toggle__switch::before {
  transform: translateX(40px - 18px);
}
.active .toggle__switch::after {
  left: 23px;
  background: #7920ff;
  box-shadow: 0 0 1px #7920ff;
}
</style>