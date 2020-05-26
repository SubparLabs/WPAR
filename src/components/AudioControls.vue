<template>
  <div>
    <div class="controls" :class="isActive && 'active'">
      <audio
        crossorigin
        id="audioPlayer"
        src="https://stream.subpar.fm/radio/8000/radio.mp3"
      ></audio>
      <Button
        class="playback-controls disable-select"
        v-bind:action="togglePlay"
      >
        <span v-if="!isActive">PLAY</span>
        <span v-else>STOP</span>
      </Button>
      <div class="footer-right">
        <router-link to="/about">about subpar</router-link>
      </div>
    </div>
    <canvas
      :class="isActive && 'active'"
      class="vis-canvas"
      :width="bodyWidth"
      height="100"
      >Audio visualization canvas</canvas
    >
  </div>
</template>
<script>
import Button from "./common/Button";
export default {
  name: "AudioControls",
  components: { Button },
  props: ["visCallback"],
  beforeMount() {
    this.bodyWidth = document.body.clientWidth;
  },
  mounted() {
    this.canvas = document.querySelector(".vis-canvas");
    this.visContext = this.canvas.getContext("2d");
  },
  data() {
    return {
      hasPlayBeenClicked: false,
      isActive: false,
      visualizing: false,
      player: null,
      track: null,
      visContext: null,
      drawVisual: null,
    };
  },
  methods: {
    initVisualization() {
      // SAFARI BUG - analyizing a stream fails silently. Skip if AudioContext is not defined.
      if (window.AudioContext) {
        const audioContext = new window.AudioContext();
        // create node for volume control
        this.gainNode = audioContext.createGain();
        // create node for visalization
        this.analyserNode = audioContext.createAnalyser();
        // create source from player element
        this.track = audioContext.createMediaElementSource(this.player);
        // connect audio track to analyzer and volume nodes, and destination
        this.track
          .connect(this.gainNode)
          .connect(this.analyserNode)
          .connect(audioContext.destination);
        // start the visualization
        this.visualize();
        this.$emit("setVisualiztion", true);
      }
    },
    initPlayer() {
      // store reference to <audio> element
      this.player = document.getElementById("audioPlayer");
    },
    togglePlay() {
      if (!this.hasPlayBeenClicked) {
        this.initPlayer();
        this.initVisualization();
        this.hasPlayBeenClicked = true;
      }
      this.isActive = !this.isActive;
      this.isActive ? this.player.play() : this.player.pause();
    },
    handleVolumeChange({ target }) {
      this.gainNode.gain.value = target.value;
    },
    visualize() {
      this.analyserNode.fftSize = 256;
      this.bufferLength = this.analyserNode.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);

      this.visContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.draw();
    },
    draw() {
      this.drawVisual = requestAnimationFrame(this.draw);
      this.analyserNode.getByteFrequencyData(this.dataArray);
      // this.visC
      this.visContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const barWidth = (this.canvas.width / this.bufferLength) * 2.5;

      let x = 0,
        barHeight,
        redness,
        greenness,
        blueness,
        max = 0,
        normalizeCoefficient = 1;

      for (let i = 0; i < this.bufferLength; i++) {
        if (this.dataArray[i] > max) max = this.dataArray[i];
      }
      if (max > this.canvas.height) {
        normalizeCoefficient = (this.canvas.height * 1.8) / max;
      }

      for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i] * normalizeCoefficient;
        redness = 100 + i;
        greenness = i * 4 + barHeight;
        blueness = barHeight * 2 + 50;

        this.visContext.fillStyle = `rgb(${redness}, ${greenness}, ${blueness})`;
        this.visContext.fillRect(
          x,
          this.canvas.height - barHeight / 2,
          barWidth,
          barHeight / 2
        );

        x += barWidth + 1;
      }
    },
  },
};
</script>
<style lang="scss">
.controls {
  display: flex;
  bottom: 0;
  transition: all 0.5s ease-in;
  position: relative;

  .playback-controls {
    font-size: 2.25rem;
    font-weight: 900;
    line-height: 50px;
  }

  &.active {
    bottom: 100px;
  }
}
.vis-canvas {
  height: 0;
  width: 100%;
  transition: height 0.5s ease-in;
  position: absolute;
  bottom: 0;
  left: 0;

  &.active {
    height: 100px;
  }
}
</style>
