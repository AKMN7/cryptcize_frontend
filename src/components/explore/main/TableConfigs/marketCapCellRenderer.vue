<template>
  <div class="table-icon-marketCap">
    <span>${{ marketCap }}</span>
  </div>
</template>

<script>
export default {
  setup(props) {
    function converter(val) {
      if (Math.abs(Number(val)) >= 1.0e12)
        return (Math.abs(Number(val)) / 1.0e12).toFixed(2) + "T";
      if (Math.abs(Number(val)) >= 1.0e9)
        return (Math.abs(Number(val)) / 1.0e9).toFixed(2) + "B";
      if (Math.abs(Number(val)) >= 1.0e6)
        return (Math.abs(Number(val)) / 1.0e6).toFixed(2) + "M";
    }

    return {
      marketCap: converter(props.params.data.market_cap),
    };
  },
};
</script>
