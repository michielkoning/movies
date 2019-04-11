<template>
  <details>
    <summary>
      <strong>{{ movie.Title }}</strong><br>
      {{ fullName }}
    </summary>
    <div class="content">
      <img
        :src="movie.Poster"
        alt=""
      >
      <div class="text">
        <p>{{ movie.Plot }}</p>
        <a
          :href="`https://www.imdb.com/title/${movie.imdbID}/`"
          target="_blank"
        >IMDB</a>
      </div>
    </div>
  </details>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fullName() {
      const { Director } = this.movie;
      if (Director.MiddleName) {
        return `${Director.FirstName} ${Director.MiddleName} ${
          Director.LastName
        } `;
      }
      return `${Director.FirstName} ${Director.LastName} `;
    },
  },
};
</script>

<style lang="postcss" scoped>
.content {
  display: grid;
  grid-template-columns: 5em auto;
  grid-gap: 1em;
}
</style>
