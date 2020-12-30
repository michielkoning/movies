<template>
  <li :style="{ 'border-color': color }">
    <div :style="{ 'background-color': color }">
      <img
        v-if="movie.poster"
        :src="movie.poster"
        alt=""
        loading="lazy"
        width="300"
        height="445"
      />
    </div>
    <div class="title">{{ movie.title }}</div>
    <div class="year">{{ movie.year }}</div>
  </li>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const color = computed(() => {
      if (!props.movie.colors.length) return null;
      return props.movie.colors[0];
    });
    return {
      color,
    };
  },
};
</script>

<style lang="postcss" scoped>
li {
  grid-row: span 3;
  display: grid;
  text-align: center;
  grid-gap: 0.25em;
  padding: 0 0 0.25em;
  border: 2px solid;
  grid-template-rows: 14em auto auto;

  @supports (grid-template-rows: subgrid) {
    grid-template-rows: subgrid;
  }
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title,
.year {
  padding: 0 0.25em;
}

.year {
  font-weight: 300;
  align-self: flex-end;
}
</style>
