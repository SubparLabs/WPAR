<template>
  <div >
    <div class='display'>
      <div class='banner'>
          <span class='letter w-hover'>w</span>
          <span class='letter p-hover' onclick="document.getElementById('player').play()">p</span>
          <span class='letter a-hover' onclick="document.getElementById('player').pause()">a</span>
          <span class='letter r-hover'>r</span> 
          <span v-if='live' class='badge'>live</span>   
      </div>
      <div class='metadata'>
        <div v-if="live" class='now-playing'>
          <span class='header'>now</span>
          <p><span class="artist">{{playing.artist}}</span> | <span class="title">{{playing.title}}</span></p>
        </div>
        <div class='history'>
          <span class='header'>earlier</span>
          <p class='individual-song' v-for='song in filteredHistory'>
            <a :href="song.url">
              <span class="artist">{{song.artist}}</span> | <span class="title">{{song.title}}</span>
            </a>
          </p>
        </div>
      </div>
    </div>
    <div class='controls'>
      <div class="playback-controls">
        <span v-if='!active' @click='play'>PLAY</span>
        <span v-else @click='stop'>STOP</span>
      </div>
    </div>
    <div class='footer'>
      <span> <a href="http://subpar.biz">subpar</a> | <a href="http://twitter.com/subparr">subparr</a></span>
    </div>
  </div>
</template>

<script>
const NchanSubscriber = require('nchan')
const {Howl, Howler} = require('howler');

export default {
  name: 'Home',
  data() {
    return {
      active: false,
      player: null,
      live: null,
      streamer: null,
      playing: {
        artist: null,
        title: null
      },
      history: []

    }
  },
  computed: {
    filteredHistory() {
      return this.history.filter(song => song.artist !== ('' || 'subpar.fm'))
    }
  },
  methods: {
    initPlayer() {
      this.player = new Howl({
        src: 'https://stream.subpar.fm:8000/radio.mp3',
        html5: true
      }) 
    },
    getInitialData() {
      fetch('https://stream.subpar.fm/api/nowplaying_static/subpar.json')
        .then((response) => {
          return response.json()
        })
        .then((station) => {
          this.live = station.live.is_live

          if(this.live) {
            this.streamer = station.live.streamer_name

            document.title = `WPAR: live with ${this.streamer}`
          }

          this.playing = {
            artist: station.now_playing.song.artist,
            title: station.now_playing.song.title
          }

          station.song_history.forEach(entry => {
            let metaData = {
              artist: entry.song.artist,
              title: entry.song.title,
              art: entry.song.art,
              url: 'https://www.youtube.com/results?search_query=' + entry.song.artist + ' ' + entry.song.title
            }

            this.history.push(metaData)
          })
        })
    },
    subscribeToPlayer() {
      let sub = new NchanSubscriber('https://stream.subpar.fm/api/live/nowplaying/subpar');
      let nowPlaying;
      
      // TODO: Update the playing and push new entry to history
      sub.on("message", function(message, message_metadata) {
        
        let station = JSON.parse(message)

      });
      sub.start();
    },
    // TODO: This is slow. Need an animation or something. Player has an `onload` event
    play() {
      this.player.play()
      this.active = true
    },
    stop() {
      this.player.stop()
      this.active = false
}
  },
  mounted() {
    this.initPlayer() 
    this.getInitialData()
    this.subscribeToPlayer()
  }
}
</script>

<style lang="scss">
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
        font-family: 'Londrina Outline';
        // font-family: 'Monoton';
        font-size: 20vh;
        text-align: center;
        text-transform: uppercase;
      }

      .w-hover:hover {
          color:#Ffb400;
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
    }
  }

  .controls {
    margin-top: 20px;

    .playback-controls {
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
    font-size: .7em;
    
    a {
    text-decoration: none;
    color: white;
    }

    a:hover {
      color: #0d2c54;
    }
  }
</style>
