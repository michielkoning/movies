<template>
  <div v-if="data">
    {{ bestActors }}
    {{ favoriteActorsCount }}
    <p>
      {{ lowestScore }}
      <span
        v-for="movie in worstMovies"
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
      {{ average }}
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
      return newArray;
    },
    bestActors() {
      const countDublicates = this.actors.reduce((obj, item) => {
        if (!obj[item]) {
          obj[item] = 0;
        }
        obj[item]++;
        return obj;
      }, {});

      const testa = Object.keys(countDublicates).map(item => ({
        title: item,
        count: countDublicates[item],
      }));
      return testa;
    },

    favoriteActorCount() {
      return this.bestActors.reduce(
        (max, actor) => (actor.count > max ? actor.count : max),
        0,
      );
    },

    favoriteActorsCount() {
      const data = this.bestActors.filter(
        actor => actor.count === this.favoriteActorCount,
      );
      return data;
    },

    lowestScore() {
      return this.data.reduce(
        (min, movie) => (movie.imdbRating < min ? movie.imdbRating : min),
        10,
      );
    },
    highestScore() {
      return this.data.reduce(
        (max, movie) => (movie.imdbRating > max ? movie.imdbRating : max),
        0,
      );
    },
    average() {
      return (
        this.data.reduce((prev, current) => prev + current.imdbRating, 0)
        / this.data.length
      );
    },
    worstMovies() {
      return this.data.filter(movie => movie.imdbRating === this.lowestScore);
    },

    bestMovies() {
      return this.data.filter(movie => movie.imdbRating === this.highestScore);
    },
  },
};
</script>
