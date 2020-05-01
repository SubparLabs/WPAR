<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Londrina+Outline|Monoton|Roboto|Montserrat&display=swap');

  html {
      background-color: #FA6000;
      color: white;
      font-family: 'Montserrat';
      font-size: 24px;
      height: 100%;

      @media only screen and (max-width: 999px) {
        font-size: 20px;
      }

      @media only screen and (max-width: 579px) {
        font-size: 16px;
      }
  }
  body {
    height: 100%;
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
