<template>
  <div v-if="!isLoading" class="display">
    <div class="metadata">
      <div class="now-playing">
        <span class="header">now</span>
        <p v-if="live">
          <span class="artist">{{ playing.artist }}</span>
          <span v-if="playing.artist && playing.title"> | </span>
          <span class="title">{{ playing.title }}</span>
        </p>
        <p v-else>
          <span class="artist">WXYC</span>
          <Guest-DJ />
        </p>
      </div>
      <div class="history">
        <span class="header">earlier</span>
        <p v-for="song in filteredHistory" v-bind:key="song.id">
          <a class="individual-song" :href="song.url" target="_blank">
            <span v-if="song.artist.length > 25" class="artist">{{
              song.artist.substring(0, 25) + '...'
            }}</span>
            <span v-else class="artist">{{ song.artist }}</span> |
            <span v-if="song.title.length > 30" class="title">{{
              song.title.substring(0, 30) + '...'
            }}</span>
            <span v-else class="title">{{ song.title }}</span>
          </a>
        </p>
      </div>
    </div>
    <div v-if="live" class="schedule">
      <span class="header">Your DJ</span>
      <p class="individual-show">
        <span class="show-name">{{ streamer }}</span>
        <!-- – <span class="show-time">NOW</span> -->
      </p>
      <!-- <p v-else in filteredSchedule" class="individual-show" v-bind:key="show.name">
        <span class="show-name">{{ show.name }}</span> –
        <span class="show-time">{{ show.start | moment('calendar') }}</span>
      </p> -->
    </div>
    <div class="about">
      <router-link to="/about">about</router-link>
    </div>
  </div>
</template>

<script>
import GuestDJ from '../components/GuestDJ';
import uniqBy from 'lodash.uniqby';
import NchanSubscriber from 'nchan';

const junkArtistValues = ['(null)', '', 'subpar.fm', 'AzuraCast.com'];

export default {
  name: 'Home',
  components: { GuestDJ },
  data() {
    return {
      isLoading: true,
      live: false,
      streamer: null,
      playing: {
        artist: null,
        title: null
      },
      history: [],
      numberOfListeners: 1,
      schedule: []
    };
  },
  computed: {
    filteredHistory() {
      return uniqBy(
        this.history.filter(song => {
          if (junkArtistValues.indexOf(song.artist) < 0) {
            return song;
          }
        }),
        ({ id }) => id
      );
    },
    filteredSchedule() {
      return this.schedule.filter(show => {
        if (this.$moment().isBefore(show.start)) {
          return show;
        }
      });
    }
  },
  methods: {
    setStatus(station) {
      this.live = station.live.is_live;
      this.$emit('set-live', this.live);

      if (this.live) {
        this.streamer = station.live.streamer_name;

        document.title = `WPAR: live with ${this.streamer}`;
      } else {
        this.streamer = null;
        document.title = 'WPAR: Good Enough';
      }

      this.playing = {
        artist: station.now_playing.song.artist,
        title: station.now_playing.song.title
      };

      this.numberOfListeners = station.listeners.total;

      this.history = station.song_history.map(({ song }) => ({
        artist: song.artist,
        title: song.title,
        art: song.art,
        url: 'https://www.youtube.com/results?search_query=' + song.artist + ' ' + song.title,
        id: song.id
      }));
    },
    getInitialData() {
      fetch('https://stream.subpar.fm/api/nowplaying_static/subpar.json')
        .then(response => {
          return response.json();
        })
        .then(this.setStatus)
        .then(() => setTimeout(() => this.setLoading(false), 500));
    },
    setSchedule(schedule) {
      this.schedule = schedule.map(show => ({
        name: show.name,
        start: show.start,
        end: show.end,
        live: show.is_now
      }));
    },
    setLoading(isLoading) {
      this.isLoading = isLoading;
      this.$emit('set-loading', this.isLoading);
    },
    getScheduleData() {
      fetch('https://stream.subpar.fm/api/station/1/schedule')
        .then(response => {
          return response.json();
        })
        .then(this.setSchedule);
    },
    subscribeToPlayer() {
      const sub = new NchanSubscriber('https://stream.subpar.fm/api/live/nowplaying/subpar', {
        subscriber: 'websocket'
      });
      sub.on('message', message => {
        const station = JSON.parse(message);
        this.setStatus(station);
      });
      sub.start();
    }
  },
  beforeMount() {
    this.setLoading(true);
  },
  mounted() {
    this.getInitialData();
    this.subscribeToPlayer();
    this.getScheduleData();
  }
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
  align-content: flex-start;
  align-items: flex-start;
  transition: height 1s ease-in;

  & > div {
    padding: 1rem;
  }

  a {
    text-decoration: none;
    color: white;
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
.about {
  font-size: 0.7em;
  position: fixed;
  right: 0;
  top: 0;

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    color: #0d2c54;
  }
}
</style>
