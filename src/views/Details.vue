<template>
  <div class="content">
    <h1>{{ movie.Title }}</h1>
    <img
      :src="movie.Poster"
      alt=""
    >
    <div class="text">
      <p>{{ movie.Plot }}</p>
      <a
        :href="`https://www.imdb.com/title/${movie.imdbID}/`"
        target="_blank"
      >IMDB</a><br>
      {{ movie.imdbRating }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      movie: {},
    };
  },
  computed: {
    ...mapState('movies', ['list']),
  },

  watch: {
    $route(to, from) {
      this.movie = this.list.find(movie => movie.Slug === to.params.slug);
      // react to route changes...
    },
  },
  mounted() {
    this.movie = this.list.find(
      movie => movie.Slug === this.$route.params.slug,
    );
  },
};
</script>
