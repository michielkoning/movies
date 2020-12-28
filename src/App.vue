<template>
  <main class="center">
    <ul>
      <li v-for="movie in list" :key="movie.Slug">
        {{ movie.Title }}
      </li>
    </ul>
  </main>
</template>

<script>
import useMovies from '@/compositions/useMovies';

export default {
  setup() {
    const { list } = useMovies();
    return {
      list,
    };
  },
};
</script>

<style lang="postcss">
@import './styles/app.css';
</style>
