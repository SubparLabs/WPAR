<template>
  <button @click="action">
    <slot />
  </button>
</template>
<script>
export default {
  props: ["action"],
};
</script>
<style lang="scss" scoped>
button {
  background: transparent;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
  border: 1px solid white;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  margin: 0 auto;
  font-weight: 700;
  text-align: center;

  &:hover {
    background: white;
    color: #fa6000;
  }
}
</style>
