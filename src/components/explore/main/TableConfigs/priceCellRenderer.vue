<template>
  <div class="table-icon-price">
    <span>${{ price }}</span>
  </div>
</template>

<script>
export default {
  setup(props) {
    return {
      price: props.params.data.price.toFixed(2),
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
