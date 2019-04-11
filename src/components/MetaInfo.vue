<template>
  <div
    v-if="data"
    class="meta-info"
  >
    <p>
      Favoriete acteurs:
      <span
        v-for="actor in favoriteActors"
        :key="actor.title"
      >{{ actor.title }}, </span>
    </p>
    <p>
      Minst gewaardeerde film
      <span
        v-for="movie in worstMovies"
        :key="movie.Title"
      >
        {{ movie.Title }}
      </span>
      ({{ lowestScore }})
    </p>
    <p>
      Meest gewaardeerde films
      <span
        v-for="movie in bestMovies"
        :key="movie.Title"
      >
        {{ movie.Title }},
      </span>
      ({{ highestScore }})
    </p>
    <p>Gemiddelde score: {{ average }}</p>
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

    favoriteActors() {
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

<style>
.meta-info {
  padding: 1em;
}
</style>
