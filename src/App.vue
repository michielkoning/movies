<template>
  <div id="app">
    <the-overview />
  </div>
</template>

<script>
import TheOverview from './components/TheOverview.vue';

export default {
  components: {
    TheOverview,
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
