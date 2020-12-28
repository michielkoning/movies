<template>
  <li>
    <img
      v-if="movie.Poster && movie.Poster !== 'N/A'"
      :src="movie.Poster"
      alt=""
      loading="lazy"
      width="300"
      height="445"
    />
    {{ movie.Title }} ({{ movie.Year }})
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
}
</style>
