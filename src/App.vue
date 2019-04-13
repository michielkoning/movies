<template>
  <div
    v-if="!loading"
    id="app"
  >
    <div class="details">
      <router-view />
    </div>
    <the-overview />
  </div>
</template>

<script>
import TheOverview from '@/components/TheOverview.vue';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  components: {
    TheOverview,
  },

  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.getMovies();
  },

  methods: {
    ...mapActions({
      setMovies: 'movies/set',
    }),
    async getMovies() {
      try {
        const response = await axios.get('/data/movies.json');
        this.setMovies(response.data);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


<style scoped lang="postcss">
@import './styles/app.css';

@font-face {
  font-family: 'body';
  src: url('/fonts/CrimsonPro-Roman-VF.ttf') format('truetype');
  font-weight: 1 999;
}

@font-face {
  font-family: 'header';
  src: url('/fonts/MovementV.ttf') format('truetype');
  font-weight: 1 999;
}

#app {
  padding-left: 33%;
}

.details {
  position: fixed;
  left: 1em;
  top: 1em;
  right: 66%;
}
</style>
