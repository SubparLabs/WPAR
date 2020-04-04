<template>
  <div>
    <div class="display">
      <div class="banner">
        <span class="letter w-hover">w</span>
        <span
          class="letter p-hover"
          onclick="document.getElementById('player').play()"
          >p</span
        >
        <span
          class="letter a-hover"
          onclick="document.getElementById('player').pause()"
          >a</span
        >
        <span class="letter r-hover">r</span>
        <span v-if="live" class="badge">live</span>
      </div>
      <div class="metadata">
        <h2>
          <span>{{ numberOfListeners || "Probably millions of" }}</span>
          <span> SubPartisan</span>
          <span v-if="numberOfListeners !== 1">s are</span>
          <span v-else> is</span>
          <span> tuned in.</span>
        </h2>
        <div v-if="live" class="now-playing">
          <span class="header">now</span>
          <p>
            <span class="artist">{{ playing.artist }}</span> |
            <span class="title">{{ playing.title }}</span>
          </p>
        </div>
        <div class="history">
          <span class="header">earlier</span>
          <p v-for="song in filteredHistory" v-bind:key="song.id">
            <a class="individual-song" :href="song.url">
              <span class="artist">{{ song.artist }}</span> |
              <span class="title">{{ song.title }}</span>
            </a>
          </p>
        </div>
      </div>
    </div>
    <div class="controls">
      <audio
        id="audioPlayer"
        src="https://stream.subpar.fm:8000/radio.mp3"
      ></audio>
      <div class="playback-controls disable-select">
        <span v-if="!active" @click="play">PLAY</span>
        <span v-else @click="stop">STOP</span>
      </div>
    </div>
    <div class="footer">
      <span>
        <a href="http://subpar.biz">subpar</a> |
        <a href="http://twitter.com/subparr">subparr</a></span
      >
    </div>
  </div>
</template>

<script>
const NchanSubscriber = require("nchan");

const junkArtistValues = ["(null)", "", "subpar.fm"];

export default {
  name: "Home",
  data() {
    return {
      active: false,
      player: null,
      live: null,
      streamer: null,
      playing: {
        artist: null,
        title: null,
      },
      history: [],
      numberOfListeners: 1,
    };
  },
  computed: {
    filteredHistory() {
      return this.history.filter((song) => {
        if (junkArtistValues.indexOf(song.artist) < 0) {
          return song;
        }
      });
    },
  },
  methods: {
    initPlayer() {
      this.player = document.getElementById("audioPlayer");
    },
    setStatus(station) {
      this.live = station.live.is_live;

      if (this.live) {
        this.streamer = station.live.streamer_name;

        document.title = `WPAR: live with ${this.streamer}`;
      }

      this.playing = {
        artist: station.now_playing.song.artist,
        title: station.now_playing.song.title,
      };

      this.numberOfListeners = station.listeners.total;

      this.history = station.song_history.map(({ song }) => ({
        artist: song.artist,
        title: song.title,
        art: song.art,
        url:
          "https://www.youtube.com/results?search_query=" +
          song.artist +
          " " +
          song.title,
        id: song.id,
      }));
    },
    getInitialData() {
      fetch("https://stream.subpar.fm/api/nowplaying_static/subpar.json")
        .then((response) => {
          return response.json();
        })
        .then(this.setStatus);
    },
    subscribeToPlayer() {
      const sub = new NchanSubscriber(
        "https://stream.subpar.fm/api/live/nowplaying/subpar",
        {
          subscriber: "websocket",
        }
      );

      // TODO: Update the playing and push new entry to history
      sub.on("message", (message, message_metadata) => {
        const station = JSON.parse(message);
        this.setStatus(station);
      });
      sub.start();
    },
    play() {
      this.player.play();
      this.active = true;
    },
    stop() {
      this.player.pause();
      this.active = false;
    },
  },
  mounted() {
    this.initPlayer();
    this.getInitialData();
    this.subscribeToPlayer();
  },
};
</script>

<style lang="scss">
h2 {
  font-size: 1.5rem;
  font-weight: 500;
}

.disable-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.display {
  display: flex;
  height: 80%;

  a {
    text-decoration: none;
    color: white;
  }

  .banner {
    color: white;
    flex-grow: 1;
    margin-right: 20px;
    text-align: center;

    span {
      display: block;
    }

    .letter {
      font-family: "Londrina Outline";
      // font-family: 'Monoton';
      font-size: 20vh;
      text-align: center;
      text-transform: uppercase;
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
      font-size: 22px;
      font-weight: 900;
      text-transform: uppercase;
    }
  }

  .metadata {
    padding: 2rem;
    flex-grow: 4;

    .header {
      display: block;
      margin-top: 40px;
      margin-bottom: 10px;
      text-decoration: underline;
      text-transform: uppercase;
    }

    .individual-song {
      .artist {
        font-weight: 900;
      }

      .title {
      }
    }

    .individual-song:hover {
      color: #0d2c54;
    }
  }
}

.controls {
  margin-top: 20px;

  .playback-controls {
    cursor: pointer;
    position: relative;
    border: 1px solid white;
    height: 50px;
    width: 200px;
    margin: 0 auto;
    font-size: 36px;
    font-weight: 900;
    line-height: 50px;
    text-align: center;
  }
}

.footer {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 25px;
  font-size: 0.7em;

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    color: #0d2c54;
  }
}
</style>
