<template>
  <div class="guest-dj-wrapper">
    <div v-if="!showInputs && !isComplete">
      <p>Looks like no one's on air...</p>
      <Button v-bind:action="showForm">Guest DJ</Button>
    </div>
    <div v-if="showInputs">
      <div><label for="name">What's your DJ name?</label></div>
      <input v-model="displayName" id="name" type="text" />
      <p>How long do you want to spin?</p>
      <div :key="'radio=' + opt" v-for="opt in options">
        <input name="guest-dj-radio" v-bind:value="opt" v-bind:id="'btn-' + opt" type="radio" />
        <label class="radio-label" v-bind:for="'btn-' + opt">{{ opt }} minutes</label>
      </div>
      <Button :disabled="isSubmitted" v-bind:action="makeMeDJ">Sign me up!</Button>
    </div>
    <div v-if="isComplete">
      <p>You're all set...</p>
      <Button v-bind:action="toBooth">To the booth!</Button>
    </div>
  </div>
</template>
<script>
import Button from './common/Button';

export default {
  name: 'GuestDJ',
  components: { Button },
  data() {
    return {
      showInputs: false,
      isSubmitted: false,
      isComplete: false,
      options: [10, 30, 60],
      displayName: '',
      username: 'guest',
      password: ''
    };
  },
  methods: {
    showForm() {
      this.showInputs = true;
    },
    makeMeDJ() {
      fetch(`/.netlify/functions/create-guest-dj?n=${this.displayName}`)
        .then(response => response.json())
        .then(guestData => {
          this.password = guestData.password;
          this.isComplete = true;
          this.showInputs = false;
        })
        .catch(console.error);
    },
    toBooth() {
      window.open(
        `https://stream.subpar.fm/public/subpar/dj?n=${this.username}&p=${this.password}`
      );
    }
  }
};
</script>
<style lang="scss">
.guest-dj-wrapper {
  margin-bottom: 2rem;

  .radio-label {
    margin-left: 0.5rem;
  }

  button {
    margin-top: 1rem;
  }
}
</style>
