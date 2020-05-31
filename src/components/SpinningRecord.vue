<template>
  <div class="record" />
</template>
<style lang="scss" scoped>
.record {
  animation: spin 1.8s linear infinite;
  position: relative;
  margin: 19px auto;
  width: 262px;
  height: 262px;
  border-radius: 50%;
  background: linear-gradient(
        30deg,
        transparent 40%,
        rgba(42, 41, 40, 0.85) 40%
      )
      no-repeat 100% 0,
    linear-gradient(60deg, rgba(42, 41, 40, 0.85) 60%, transparent 60%)
      no-repeat 0 100%,
    repeating-radial-gradient(#2a2928, #2a2928 4px, #ada9a0 5px, #2a2928 6px);
  background-size: 50% 100%, 100% 50%, 100% 100%;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -35px;
    border: solid 1px #d9a388;
    width: 68px;
    height: 68px;
    border-radius: 50%;
    box-shadow: 0 0 0 4px #da5b33, inset 0 0 0 27px #da5b33;
    background: #b5ac9a;
    content: "";
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
