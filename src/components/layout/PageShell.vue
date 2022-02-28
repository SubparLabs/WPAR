<template>
  <div class="page-shell">
    <div class="loader" v-if="isLoading"><SpinningRecord /></div>
    <div class="wrapper">
      <div class="settings-wrapper">
        <button
          @click="toggleSettings"
          v-bind:class="{ rotated: isSettingsOpen }"
          class="config-btn"
        >
          <!-- <SettingsIcon width="40" /> -->
        </button>
        <!-- <Settings
          v-if="isSettingsOpen"
          :currentColorTheme="colorTheme"
          @set-theme="setColorTheme"
          @close-settings="toggleSettings"
        /> -->
      </div>
      <header class="banner">
        <span
          v-for="(letter, index) in ['w', 'p', 'a', 'r']"
          v-bind:key="letter"
          v-bind:class="{ letter: 1, [`letter-${availableColorThemes[index]}`]: 1 }"
          @click="setColorTheme(availableColorThemes[index])"
        >
          {{ letter }}
        </span>
        <span v-if="isLive">
          <div class="badge">live</div>
        </span>
      </header>
      <main :class="isVisualizing && 'vis-height-offset'">
        <router-view @set-loading="setLoading" @set-live="setLive" />
      </main>
    </div>
    <div class="footer">
      <AudioControls @set-visualiztion="setVisualiztion" />
    </div>
  </div>
</template>
<script>
import AudioControls from '../AudioControls';
import SpinningRecord from '../SpinningRecord';

import { colorThemes, defaultTheme, localStorageKey } from '../../utils/colorThemes';

export default {
  components: { AudioControls, SpinningRecord },

  data() {
    return {
      isLive: false,
      isVisualizing: false,
      isSettingsOpen: false,
      isLoading: true,
      colorTheme: ''
    };
  },
  computed: {
    availableColorThemes: function () {
      const allThemes = [...colorThemes];
      allThemes.splice(colorThemes.indexOf(this.colorTheme), 1);

      return allThemes;
    }
  },
  beforeMount() {
    let theme = defaultTheme;

    if (window.localStorage) {
      theme = window.localStorage.getItem(localStorageKey);
    }

    this.setColorTheme(theme);
  },
  methods: {
    setLive(isLive) {
      this.isLive = isLive;
    },
    setVisualiztion(isVisualizing) {
      this.isVisualizing = isVisualizing;
    },
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },
    setColorTheme(theme) {
      if (window.localStorage) {
        window.localStorage.setItem(localStorageKey, theme);
      }
      this.colorTheme = theme;
      document.body.className = theme;
    }
  }
};
</script>
<style lang="scss">
$footer-height: 110px;
$med-header-height: 195px;
$mobile-header-height: 110px;
$canvas-height: 100px;
$config-button-height: 30px;

$viewport-height: 100vh; // Fallback for browsers that do not support Custom Properties
$viewport-height: calc(var(--vh, 1vh) * 100); // see public/scripts/set-vh.js

.page-shell {
  .loader {
    position: absolute;
    top: 50%; /*position Y halfway in*/
    left: 50%; /*position X halfway in*/
    transform: translate(-50%, -50%);
  }
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
  .settings-wrapper {
    position: absolute;
    margin: 0.5rem 0 0 1rem;
    z-index: 1;
  }

  .config-btn {
    cursor: pointer;
    border: none;
    background: none;
    transition: 0.2s transform ease;
    transform-origin: 50% 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(360deg);

    & > .settings-svg {
      transition: fill 0.2s ease;
    }
    &:active {
      transform: scale(1.05);
    }

    &.rotated {
      transform: rotate(180deg);

      & > .settings-svg {
        fill: white;
      }
    }

    &:focus {
      outline: none;
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
    display: inline-block;
    position: relative;
    color: white;
    text-align: center;
    margin-left: 1rem;

    @media only screen and (max-width: 999px) {
      margin-left: 0;
      height: $med-header-height;
    }
    @media only screen and (max-width: 579px) {
      margin-left: 0;
      height: $mobile-header-height;
    }
    .letter {
      font-family: 'Londrina Outline';
      font-size: 5rem;
      text-align: center;
      text-transform: uppercase;
      cursor: pointer;
      @media only screen and (min-width: 580px) {
        font-size: 8rem;
      }
      @media only screen and (min-width: 1000px) {
        display: block;
        font-size: 20vh;
      }
    }

    @each $themeKey in map-keys($themes) {
      @debug $themeKey;
      .letter-#{$themeKey}:hover {
        @include getTheme($themeKey);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
  }
}
</style>
