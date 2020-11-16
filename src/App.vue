<template>
  <div id="app">
    <PageShell />
  </div>
</template>
<script>
import PageShell from "./components/layout/PageShell";
export default {
  components: { PageShell },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Londrina+Outline|Monoton|Roboto|Montserrat&display=swap");

html {
  color: white;
  font-family: "Montserrat";
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
  background: rgb(81,24,69);
  background: linear-gradient(0deg, rgba(81,24,69,1) 0%, rgba(144,12,63,1) 23%, rgba(199,0,57,1) 59%, rgba(255,87,51,1) 100%);
  background-attachment: fixed;
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
