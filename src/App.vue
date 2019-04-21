<template>
  <div
    v-if="list.length"
    id="app"
  >
    <the-overview />
  </div>
</template>

<script>
import TheOverview from '@/components/TheOverview.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    TheOverview,
  },

  computed: {
    ...mapState('movies', ['list']),
  },
  mounted() {
    this.setMovies();
  },

  methods: {
    ...mapActions({
      setMovies: 'movies/set',
    }),
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
</style>
