<template>
  <div >
    <div class='display'>
      <div class='banner'>
          <span class='letter w-hover'>w</span>
          <span class='letter p-hover'>p</span>
          <span class='letter a-hover'>a</span>
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
          <p class='individual-song' v-for='song in history' v-if='song.artist !== "(null)"'>
            <span class="artist">{{song.artist}}</span> | <span class="title">{{song.title}}</span>
          </p>
        </div>
      </div>
    </div>
    <div id="controls">
      <iframe src='https://stream.subpar.fm/public/subpar/embed' frameborder='0' allowtransparency='true' style="width: 98%; position: absolute; bottom: -38px; left: 1%;"></iframe>
    </div>
  </div>
</template>

<script>
let NchanSubscriber = require('nchan')

export default {
  name: 'Home',
  data() {
    return {
      live: null,
      streamer: null,
      playing: {
        artist: null,
        title: null
      },
      history: []

    }
  },
  methods: {
    getInitialData() {
      fetch('https://stream.subpar.fm/api/nowplaying_static/subpar.json')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          let station = data
          console.log(station)

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
              art: entry.song.art
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
        console.log(station)
        console.log(message_metadata)

      });
      sub.start();
    }
  },
  mounted() {
    this.getInitialData()
    this.subscribeToPlayer()
  }
}
</script>

<style lang="scss">
  .display {
    display: flex;
    height: 80%;

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
          color:#4F8EFF;
      }

      .p-hover:hover {
          color: #42E9FF;
      }

      .a-hover:hover {
          color: #FFBB29;
      }
      .r-hover:hover {
          color: #36FFA6;
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
  }
</style>
