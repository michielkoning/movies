<template>
  <ul class="list">
    <movie-list-item
      v-for="movie in sortedMovies"
      :key="movie.slug"
      :movie="movie"
    />
  </ul>
</template>

<script>
import useMovies from '@/compositions/useMovies';
import MovieListItem from '@/components/MovieListItem.vue';
import { computed } from 'vue';

export default {
  components: {
    MovieListItem,
  },
  setup() {
    const { movies } = useMovies();

    const sortedMovies = computed(() =>
      movies.sort((a, b) => a.title > b.title),
    );

    return {
      sortedMovies,
      movies,
    };
  },
};
</script>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;

  display: grid;
  grid-gap: var(--gutter);
  grid-template-columns: repeat(2, 1fr);

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  }
}
</style>
