<template>
  <main class="center">
    {{ averageScore }}
    {{ highestScore }}
    {{ lowestScore }}
    {{ bestMovies }}
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
    const {
      list,
      averageScore,
      highestScore,
      lowestScore,
      actors,
      worstMovies,
      bestMovies,
    } = useMovies();
    return {
      list,
      averageScore,
      highestScore,
      lowestScore,
      actors,
      worstMovies,
      bestMovies,
    };
  },
};
</script>

<style lang="postcss">
@import './styles/app.css';
</style>
