<template>
  <center-wrapper>
    <main class="center">
      <movie-list />
      <overall-scores />
    </main>
  </center-wrapper>
</template>

<script>
import OverallScores from '@/components/OverallScores.vue';
import MovieList from '@/components/MovieList.vue';
import CenterWrapper from '@/components/CenterWrapper.vue';

export default {
  components: {
    CenterWrapper,
    OverallScores,
    MovieList,
  },
};
</script>

<style lang="postcss">
@import './styles/app.css';
</style>
