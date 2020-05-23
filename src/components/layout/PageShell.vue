<template>
  <div class="page-shell">
    <div class="wrapper">
      <header class="banner">
        <span class="letter w-hover">w</span>
        <span class="letter p-hover">p</span>
        <span class="letter a-hover">a</span>
        <span class="letter r-hover">r</span>
        <span v-if="isLive" class="badge">live</span>
      </header>
      <main :class="isVisualizing && 'vis-height-offset'">
        <router-view @setLive="setLive" />
      </main>
    </div>
    <div class="footer">
      <AudioControls @setVisualiztion="setVisualiztion" />
    </div>
  </div>
</template>
<script>
import AudioControls from "../AudioControls";
export default {
  components: { AudioControls },
  data() {
    return {
      isLive: false,
      isVisualizing: false,
    };
  },
  methods: {
    setLive(isLive) {
      this.isLive = isLive;
    },
    setVisualiztion(isVisualizing) {
      this.isVisualizing = isVisualizing;
    },
  },
};
</script>
<style lang="scss">
$footer-height: 110px;
$med-header-height: 195px;
$mobile-header-height: 110px;
$canvas-height: 100px;

$viewport-height: 100vh; // Fallback for browsers that do not support Custom Properties
$viewport-height: calc(var(--vh, 1vh) * 100); // see public/scripts/set-vh.js

.page-shell {
  main {
    height: calc(#{$viewport-height} - #{$footer-height});
    overflow-y: scroll;
    flex-grow: 1;
    transition: height 1s ease-in;

    &.vis-height-offset {
      height: calc(#{$viewport-height} - #{$footer-height} - #{$canvas-height});
    }

    @media only screen and (max-width: 999px) {
      height: calc(#{$viewport-height} - #{$footer-height} - #{$med-header-height});
      &.vis-height-offset {
        height: calc(
          #{$viewport-height} - #{$footer-height} - #{$med-header-height} - #{$canvas-height}
        );
      }
    }
    @media only screen and (max-width: 579px) {
      height: calc(#{$viewport-height} - #{$footer-height} - #{$mobile-header-height});
      &.vis-height-offset {
        height: calc(
          #{$viewport-height} - #{$footer-height} - #{$mobile-header-height} - #{$canvas-height}
        );
      }
    }
  }
  .wrapper {
    display: flex;
    flex-direction: row;

    @media only screen and (max-width: 999px) {
      flex-direction: column;
    }
  }
  .banner {
    margin-left: 1rem;
    display: inline-block;
    position: relative;
    color: white;
    text-align: center;
    @media only screen and (max-width: 999px) {
      margin-left: 0;
      height: $med-header-height;
    }
    @media only screen and (max-width: 579px) {
      margin-left: 0;
      height: $mobile-header-height;
    }
    .letter {
      font-family: "Londrina Outline";
      font-size: 5rem;
      text-align: center;
      text-transform: uppercase;
      @media only screen and (min-width: 580px) {
        font-size: 8rem;
      }
      @media only screen and (min-width: 1000px) {
        display: block;
        font-size: 20vh;
      }
    }

    .w-hover:hover {
      color: #ffb400;
    }

    .p-hover:hover {
      color: #00a6ed;
    }

    .a-hover:hover {
      color: #7fb000;
    }
    .r-hover:hover {
      color: #0d2c54;
    }

    .badge {
      font-size: 1.375rem;
      font-weight: 900;
      text-transform: uppercase;

      @media only screen and (max-width: 999px) {
        display: block;
      }
    }
  }
  .footer {
    height: $footer-height;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    font-size: 0.7rem;
    box-sizing: border-box;

    a {
      text-decoration: none;
      color: white;
    }

    a:hover {
      color: #0d2c54;
    }

    .footer-right {
      float: right;
      margin-top: auto;
    }

    .footer-left {
      display: none;
      float: left;
    }
  }
}
</style>
