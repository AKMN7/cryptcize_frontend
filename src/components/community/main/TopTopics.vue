<template>
  <div class="community__item community__item__topTopics">
    <div class="grid__title">
      <span>Top Topics</span>
      <button
        v-tippy="
          'These are the top topics up for discussion. Click on any one to join!'
        "
      >
        <ion-icon name="help-circle-outline" class="profile__icon"></ion-icon>
      </button>
    </div>

    <swiper
      :direction="'vertical'"
      :slidesPerView="'auto'"
      :spaceBetween="15"
      :mousewheel="true"
      :modules="modules"
      :scrollbar="{ hide: false }"
      class="topTopics__list"
    >
      <swiper-slide
        v-for="topic in topTopics"
        :key="topic._id"
        @click="routeTo(topic.topicCode)"
        class="topTopics__list__item"
      >
        <div class="topicName">{{ removeSlug(topic.topicName) }}</div>
        <div class="totalComments">
          <ion-icon name="chatbox-sharp"></ion-icon>
          <span>{{ topic.totalComments }}</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Scrollbar } from "swiper";
import { useRouter } from "vue-router";

export default {
  props: ["topTopics"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter();

    function routeTo(topicID) {
      router.push(`/app/community/${topicID}`);
    }

    function removeSlug(string) {
      return string.replaceAll("-", " ");
    }

    return { routeTo, removeSlug, modules: [Mousewheel, Scrollbar] };
  },
};
</script>

<style scoped>
.topTopics__list {
  height: 90%;
}
.swiper-slide {
  box-sizing: border-box;
  height: max-content !important;
}
</style>