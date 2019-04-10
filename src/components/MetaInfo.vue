<template>
  <div v-if="data">
    <p>
      {{ lowestScore }}
      <span
        v-for="movie in worsMovies"
        :key="movie.Title"
      >
        {{ movie.Title }}
      </span>
    </p>
    <p>
      {{ highestScore }}
      <span
        v-for="movie in bestMovies"
        :key="movie.Title"
      >
        {{ movie.Title }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  computed: {
    actors() {
      let newArray = [];

      this.data.forEach((item) => {
        newArray = [...newArray, ...item.Actors];
      });
      return newArray.map(item => ({
        title: item,
        count: 0,
      }));
    },
    bestActors() {
      const transportation = this.actors.reduce((obj, item) => {
        if (!obj.title) {
          obj.count = 0;
        }
        obj.count++;
        return obj;
      }, {});
      return transportation;
    },

    lowestScore() {
      return this.data.reduce(
        (min, movie) => (Number(movie.imdbRating) < min ? Number(movie.imdbRating) : min),
        10,
      );
    },
    worsMovies() {
      return this.data.filter(
        movie => Number(movie.imdbRating) === this.lowestScore,
      );
    },
    highestScore() {
      return this.data.reduce(
        (max, movie) => (Number(movie.imdbRating) > max ? Number(movie.imdbRating) : max),
        0,
      );
    },
    bestMovies() {
      return this.data.filter(
        movie => Number(movie.imdbRating) === this.highestScore,
      );
    },
  },
};
</script>
