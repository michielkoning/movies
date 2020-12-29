<template>
  <li>
    <div>
      <img
        v-if="movie.poster"
        :src="movie.poster"
        alt=""
        loading="lazy"
        width="300"
        height="445"
      />
    </div>
    <div>{{ movie.title }} ({{ movie.year }})</div>
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
  grid-row: span 2;
  display: grid;
  grid-template-rows: subgrid;
  text-align: center;
  grid-gap: 0.25em;
  line-height: 1.2;
}

img {
  display: block;
  margin: 0;
  width: 100%;
}
</style>
