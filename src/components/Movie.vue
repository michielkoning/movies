<template>
  <details
    class="movie"
    :style="{
      '--color': movie.bgColor[0],
      '--color2': movie.bgColor[1],
      '--color3': movie.bgColor[3]
    }"
    :class="{ 'dark-text': movie.darkTextColor }"
  >
    <summary>{{ movie.Title }}</summary>

    <div
      class="content"
    >
      <img
        :src="movie.Poster"
        alt=""
      >
      <div class="text">
        <div class="director">
          {{ fullName }}
        </div>
        <p class="plot">
          {{ movie.Plot }}
        </p>
        <p>
          <a
            :href="`https://www.imdb.com/title/${movie.imdbID}/`"
            target="_blank"
          >IMDB</a>
        </p>
        <p>
          {{ movie.imdbRating }}
        </p>
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
a {
  text-decoration: none;
  display: block;
}

p {
  margin-bottom: 0.25em;
}

details {
  transition: all 2s;
  background: white;
  &[open] {
    background: linear-gradient(
      90deg,
      #000 0%,
      var(--color) 1em,
      var(--color) 2em,
      #000 40%,
      #000 100%
    );
    color: var(--white);

    &.dark-text {
      color: var(--black);
    }
  }
}

.director {
  font-family: 'header';
}

.content {
  padding: 1em;
  display: grid;
  grid-template-columns: 8em auto;
  grid-gap: 1em;
}

img {
  display: block;
}

a {
  color: currentColor;
}

p {
  max-width: 60ch;
}
</style>
