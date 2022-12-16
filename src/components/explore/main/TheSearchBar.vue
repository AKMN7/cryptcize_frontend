<template>
  <div class="explore__main__search">
    <input
      type="text"
      class="explore__main__search__input"
      placeholder="Search Coin e.g. BTC"
      id="coninSearch"
      spellcheck="false"
      v-model.trim="coin"
    />
    <button class="explore__main__search__btn" @click="navigatePage">
      <ion-icon name="search-outline" class="link__icon"></ion-icon>
    </button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  setup() {
    const router = useRouter();
    let coin = ref("");
    function navigatePage() {
      router.push(`/app/explore/${coin.value.toLowerCase()}`);
    }

    return { coin, navigatePage };
  },
};
</script>

<style lang="scss" scoped>
.explore__main__search {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;

  &__input {
    font-size: 1.6rem;
    font-family: "Lato", sans-serif;
    color: inherit;
    padding: 1.25rem 2rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: rgba(#ffffff, 0.85);
    box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
    border: none;
    border-bottom: 3px solid transparent;
    width: 30%;
    display: block;
    transition: all 0.3s;

    @media only screen and (max-width: 58em) {
      width: 100%;
    }

    &:focus {
      outline: none;
      box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
      border-bottom: 3px solid #7920ff;
    }

    &:focus:invalid {
      border-bottom: 3px solid orangered;
    }

    &::-webkit-input-placeholder {
      color: #999;
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 3rem;
    font-weight: 400;
    letter-spacing: 1.2px;
    font-family: "Lato", sans-serif;
    background-color: #7920ff;
    color: #ffffff;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
    padding: 0.85rem;
    cursor: pointer;
    width: 8rem;
    transition: all 0.2s;

    &:hover {
      background-color: #6600ff;
    }
  }
}
</style>