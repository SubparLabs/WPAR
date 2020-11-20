<template>
  <div id="app">
    <PageShell />
  </div>
</template>
<script>
import PageShell from './components/layout/PageShell';
export default {
  components: { PageShell }
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Londrina+Outline|Monoton|Roboto|Montserrat&display=swap');

html {
  color: white;
  font-family: 'Montserrat';
  font-size: 24px;

  @media only screen and (max-width: 999px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 579px) {
    font-size: 16px;
  }
}

body {
  min-height: 100%;
  background-attachment: fixed !important;
  background-image: linear-gradient(#fa6000, #fa8e00);

  @each $themeKey in map-keys($themes) {
    &.#{$themeKey} {
      @include getTheme($themeKey);
    }
  }
}

p {
  line-height: 1.25rem;
}

button {
  -webkit-appearance: none;
  color: unset;
  letter-spacing: unset;
  word-spacing: unset;
  text-transform: unset;
  text-shadow: unset;
  font: unset;
}

#app {
  height: 100%;
}
</style>
