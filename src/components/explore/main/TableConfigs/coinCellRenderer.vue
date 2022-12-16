<template>
  <div class="table-icon-name">
    <img :src="coinIcon" alt="" />
    <span>{{ cionName }}</span>
  </div>
</template>

<script>
export default {
  setup(props) {
    return {
      coinIcon: props.params.data.logo,
      cionName: props.params.data.name,
    };
  },
};
</script>

<style scoped>
.table-icon-name {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.table-icon-name img {
  height: 3rem;
  width: 3rem;
  margin-right: 15px;
}
</style>
