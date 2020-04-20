<template>
  <div>
  <div class="chat">
  <script type="application/javascript" id="cid0020000248413075345" data-cfasync="false" async src="//st.chatango.com/js/gz/emb.js" style="width: 200px;height: 300px;">{"handle":"wpar","arch":"js","styles":{"a":"FA6000","b":100,"c":"FFFFFF","d":"FFFFFF","f":0,"g":"FFFFFF","i":0,"j":"FFFFFF","k":"FFFFFF","l":"FFFFFF","m":"FFFFFF","n":"FFFFFF","p":"10","q":"FFFFFF","v":0,"cv":1,"cvfnt":"monospace, sans-serif","cvfntsz":"15px","cvbg":"CC0000","cvbga":0,"cvfg":"ffffff","cvw":75,"cvh":30,"surl":0,"allowpm":0,"showhdr":0,"sbc":"FFFFFF","sba":20,"pos":"tr","usricon":0}}</script>
  </div>  
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
              <span v-if="song.artist.length>25" class="artist">{{ song.artist.substring(0,25)+"..." }}</span>
              <span v-else class="artist">{{ song.artist }}</span> |
              <span v-if="song.title.length>30" class="title">{{ song.title.substring(0,30)+"..." }}</span>
              <span v-else class="title">{{ song.title }}</span>
            </a>
          </p>
        </div>
      </div>
      <div class="schedule">
        <span class="header">upcoming shows</span>
          <p v-if="live" class="individual-show">
            <span class="show-name">{{ streamer }}</span> – 
            <span class="show-time">NOW</span>  
        <p v-for="show in filteredSchedule" class="individual-show" v-bind:key="show.name">
          <span class="show-name">{{ show.name }}</span> – 
          <span v-if="" class="show-time">{{ show.start | moment("calendar") }}</span>
        </p>
      </div> 
    </div>
    <div class="footer">
    <div class="controls">
      <audio
        id="audioPlayer"
        src="https://stream.subpar.fm:8000/radio.mp3"
      ></audio>
      <div class="playback-controls disable-select" @click="togglePlay">
        <span v-if="!active">PLAY</span>
        <span v-else>STOP</span>
      </div>
    </div>
      <div class= "footer-left">
        <span>{{ numberOfListeners || "probably millions of" }}</span>
        <span> subpartisan</span>
        <span v-if="numberOfListeners !== 1">s are</span>
        <span v-else> is</span>
        <span> tuned in</span>
      </div>
      <div class="footer-right">
        <router-link to='/about'>about subpar</router-link>
      </div>
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
      schedule: [],
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
    filteredSchedule() {
      return this.schedule.filter((show) => {
        if (this.$moment().isBefore(show.start)) {
          return show;
        }
      })
    }
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
        id: song.sh_id,
      }));
    },
    getInitialData() {
      fetch("https://stream.subpar.fm/api/nowplaying_static/subpar.json")
        .then((response) => {
          return response.json();
        })
        .then(this.setStatus);
    },
    setSchedule(schedule) {
      this.schedule = schedule.map(show => ({
      name: show.name,
      start: show.start,
      end: show.end,
      live: show.is_now,
      }))
    },
    getScheduleData() {
      fetch("https://stream.subpar.fm/api/station/1/schedule")
        .then((response) => {
          return response.json();
        })
        .then(this.setSchedule);
    },
    subscribeToPlayer() {
      const sub = new NchanSubscriber(
        "https://stream.subpar.fm/api/live/nowplaying/subpar",
        {
          subscriber: "websocket",
        }
      );
      sub.on("message", (message, message_metadata) => {
        const station = JSON.parse(message);
        this.setStatus(station);
      });
      sub.start();
    },
    togglePlay() {
      this.active = !this.active;
      this.active ? this.player.play() : this.player.pause();
    }
  },
  mounted() {
    this.initPlayer();
    this.getInitialData();
    this.subscribeToPlayer();
    this.getScheduleData();
  },
};
</script>

<style lang="scss">

.disable-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.display {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;

  & > div {
    padding: 1rem;
  }

  a {
    text-decoration: none;
    color: white;
  }


  .banner {
    color: white;
    flex-grow: 1;
    text-align: center;
    width: 100%;
    z-index: 100;

    .letter {
      font-family: "Londrina Outline";
      font-size: 25vw;
      text-align: center;
      text-transform: uppercase;
    }

      @media only screen and (min-width: 1000px) {
        width: unset;

        .letter {
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
    }
  }

    .header {
      display: block;
      margin-bottom: 10px;
      text-decoration: underline;
      text-transform: uppercase;
    }

  .metadata {
    flex-grow: 4;

    .individual-song {
      .artist {
        font-weight: 900;
      }
    }

    .individual-song:hover {
      color: #0d2c54;
    }

    .now-playing {
      margin-bottom: 20px;
    }
  }
  .schedule {
    flex-grow: 4;

    .show-time {
    text-transform: lowercase;
    }
  }
}

.controls {
  display: flex;

  .playback-controls {
    transition: all .2s ease-in-out;
    cursor: pointer;
    position: relative;
    border: 1px solid white;
    display: inline-block;
    padding: .5rem 1.5rem;
    margin: 0 auto;
    font-size: 2.25rem;
    font-weight: 900;
    line-height: 50px;
    text-align: center;
    width: 148px;

    &:hover {
      background: white;
      color: #FA6000;
    }
  }
}
.chat {
  position: sticky;
  right: 0;
}
.footer {
  position: sticky;
  bottom: 0;
  padding: 5px 25px 25px 25px;
  font-size: 0.7rem;
  background-color: #FA6000;

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    color: #0d2c54;
  }

  .footer-right {
  float: right;
  }

  .footer-left {
  float: left;
  }
}
</style>
