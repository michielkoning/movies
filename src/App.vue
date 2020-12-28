<template>
  <main class="center">
    <overall-scores />
    <movie-list />
  </main>
</template>

<script>
import OverallScores from '@/components/OverallScores.vue';
import MovieList from '@/components/MovieList.vue';

export default {
  components: {
    OverallScores,
    MovieList,
  },
};
</script>

<style lang="postcss">
@import './styles/app.css';
</style>
