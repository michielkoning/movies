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
      ({{ lowestScore| roundAverage }})
    </p>
    <p>
      Meest gewaardeerde films
      <span
        v-for="movie in bestMovies"
        :key="movie.Title"
      >
        {{ movie.Title }},
      </span>
      ({{ highestScore | roundAverage }})
    </p>
    <p>Gemiddelde score: {{ average | roundAverage }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  filters: {
    roundAverage(value) {
      const formatter = new Intl.NumberFormat('nl-NL', {
        style: 'decimal',
        maximumFractionDigits: 2,
      });
      return formatter.format(value);
    },
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      average: 'movies/averageScore',
      lowestScore: 'movies/lowestScore',
      highestScore: 'movies/highestScore',
      worstMovies: 'movies/worstMovies',
      bestMovies: 'movies/bestMovies',
      actors: 'movies/actors',
    }),

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
  },
};
</script>

<style>
.meta-info {
  padding: 1em;
}
</style>
