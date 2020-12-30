<template>
  <dl>
    <dt>Gemiddelde score:</dt>
    <dd>{{ averageScore }}</dd>
    <dt>Beste film:</dt>
    <dd>{{ bestMoviesText }}</dd>
    <dt>Slechtste film:</dt>
    <dd>{{ worstMoviesText }}</dd>
  </dl>
</template>

<script>
import { computed } from 'vue';
import useMovies from '@/compositions/useMovies';

export default {
  setup() {
    const {
      averageScore,
      highestScore,
      lowestScore,
      worstMovies,
      bestMovies,
    } = useMovies();

    const bestMoviesText = computed(() => {
      const list = bestMovies.value.map(movie => {
        return movie.title;
      });
      return `${list.join(', ')} (${bestMovies.value[0].rating})`;
    });
    const worstMoviesText = computed(() => {
      const list = worstMovies.value.map(movie => {
        return movie.title;
      });
      return `${list.join(', ')} (${worstMovies.value[0].rating})`;
    });
    return {
      averageScore,
      highestScore,
      lowestScore,
      bestMoviesText,
      worstMoviesText,
    };
  },
};
</script>

<style lang="postcss" scoped>
dl {
  display: grid;
  grid-template-columns: 9em auto;
  grid-gap: 0.25em 0.5em;
}
</style>
