<template>
  <li>
    <img
      v-if="movie.poster && movie.poster !== 'N/A'"
      :src="movie.poster"
      alt=""
      loading="lazy"
      width="300"
      height="445"
    />
    {{ movie.title }} ({{ movie.year }})
  </li>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
li {
  grid-template-columns: subgrid;
  text-align: center;
}

img {
  display: block;
  margin: 0;
  width: 100%;
}
</style>
