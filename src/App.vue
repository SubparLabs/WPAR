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

  &.classic {
    background-image: linear-gradient(#fa6000, #fa8e00);
  }

  &.grapefruit {
    background: rgb(81, 24, 69);
    background: linear-gradient(
      0deg,
      rgba(81, 24, 69, 1) 0%,
      rgba(144, 12, 63, 1) 23%,
      rgba(199, 0, 57, 1) 59%,
      rgba(255, 87, 51, 1) 100%
    );
  }

  &.frost {
    background: rgb(35, 119, 164);
    background: linear-gradient(
      180deg,
      rgba(35, 119, 164, 1) 17%,
      rgba(82, 164, 199, 1) 35%,
      rgba(80, 163, 198, 1) 52%,
      rgba(121, 192, 215, 1) 74%,
      rgba(174, 216, 229, 1) 85%
    );
  }

  &.corporate-pumpkin {
    background: rgb(250, 96, 0);
    background: linear-gradient(0deg, rgba(250, 96, 0, 1) 0%, rgba(0, 0, 0, 1) 15%);

    & .settings-svg {
      fill: white;
    }
  }

  &.noir {
    background: black;

    & .settings-svg {
      fill: white;
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
