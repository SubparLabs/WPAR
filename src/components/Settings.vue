<template>
  <div class="setting-input">
    <p>Pick your color theme.</p>
    <p v-for="theme in colorThemes" v-bind:key="theme">
      <input
        type="radio"
        v-bind:id="'theme-' + theme"
        name="theme"
        v-bind:value="theme"
        v-model="selected"
        @click="onSelect(theme)"
      />
      <label v-bind:for="'theme-' + theme">{{ theme }}</label
      ><br />
    </p>
  </div>
</template>
<style scoped lang="scss">
.setting-input {
  position: relative;
  top: 0.5rem;
  background: #75818a;
  color: #000;
  border-radius: 1rem;
  display: block;
  padding: 1rem;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
}
</style>
<script>
import { colorThemes } from '../utils/colorThemes';

export default {
  name: 'Settings',
  props: ['currentColorTheme'],
  data() {
    return {
      colorThemes,
      selected: this.currentColorTheme
    };
  },
  methods: {
    onSelect(theme) {
      this.$emit('set-theme', theme);
    },
    onKeyUp(evt) {
      if (evt.key === 'Escape') {
        this.$emit('close-settings');
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', this.onKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyUp);
  }
};
</script>
