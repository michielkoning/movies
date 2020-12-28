<template>
  <ul class="list">
    <movie-list-item v-for="movie in movies" :key="movie.Slug" :movie="movie" />
  </ul>
</template>

<script>
import useMovies from '@/compositions/useMovies';
import MovieListItem from '@/components/MovieListItem.vue';

export default {
  components: {
    MovieListItem,
  },
  setup() {
    const { movies } = useMovies();

    // // const sortedActivities = movies.sort((a, b) => a.Year - b.Year);
    // // const sortedActivities = movies.sort((a, b) => a.Title - b.Title);
    // const sortedActivities = movies.sort(
    //   (a, b) => a.Director.LastName > b.Director.LastName,
    // );

    return {
      movies,
    };
  },
};
</script>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;

  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));
}
</style>
