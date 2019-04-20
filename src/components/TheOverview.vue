<template>
  <div v-if="sortedMovies">
    <div
      class="wrapper"
      :class="`sort-by-${sortKey}`"
    >
      <meta-info />

      <div class="buttons">
        Sorteer op:
        <button
          :class="{'is-active': sortKey === 'year'}"
          @click="groupByYear"
        >
          Jaar
        </button>
        <button
          :class="{'is-active': sortKey === 'title'}"
          @click="groupByTitle"
        >
          Name
        </button>
        <button
          :class="{'is-active': sortKey === 'director'}"
          @click="groupByDirector"
        >
          Director
        </button>
      </div>
      <ul>
        <li
          v-for="movie in list"
          :key="movie.Title"
        >
          <movie :movie="movie" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MetaInfo from '@/components/MetaInfo.vue';
import Movie from '@/components/Movie.vue';
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    MetaInfo,
    Movie,
  },
  data() {
    return {
      sortedMovies: [],
      sortKey: 'Name',
    };
  },

  computed: {
    ...mapState('movies', ['list']),
  },
  mounted() {
    this.groupByTitle();
  },

  methods: {
    groupByTitle() {
      this.sortedMovies = this.list;
      // this.sortByName();

      // this.sortedMovies = this.list.reduce(
      //   (result, movie) => this.groupByKey(movie.Title[0], result, movie),
      //   {},
      // );
      this.sortKey = 'title';
    },
    fullName(director) {
      if (director.MiddleName) {
        return `${director.FirstName} ${director.MiddleName} ${
          director.LastName
        } `;
      }
      return `${director.FirstName} ${director.LastName} `;
    },
    groupByYear() {
      this.sortedMovies = this.list.reduce(
        (result, movie) => this.groupByKey(movie.Year, result, movie),
        {},
      );
      this.sortKey = 'year';
    },
    sortByName() {
      return this.list.sort((a, b) => {
        if (a.Title < b.Title) {
          return -1;
        }
        if (a.Title > b.Title) {
          return 1;
        }
        return 0;
      });
    },
    sortByDirector() {
      this.list.sort((a, b) => {
        if (a.Director.LastName < b.Director.LastName) {
          return -1;
        }
        if (a.Director.LastName > b.Director.LastName) {
          return 1;
        }
        return 0;
      });
    },
    groupByDirector() {
      this.sortByDirector();

      this.sortedMovies = this.list.reduce(
        (result, movie) => this.groupByKey(movie.Director.LastName[0], result, movie),
        {},
      );
      this.sortKey = 'director';
    },
    groupByKey(group, result, movie) {
      if (!result[group]) {
        result[group] = { group, children: [movie] };
        // if there is no property in accumulator with this letter create it
        // if there is push current element to children array for that letter
      } else {
        result[group].children.push(movie);
      }
      // return accumulator
      return result;
    },

    indexOfMovie(movie) {
      return this.list.findIndex(item => item === movie);
    },
  },
};
</script>

<style>
:root {
  --list-padding: 1em;
}
</style>


<style scoped lang="postcss">
.sort-by-title {
  --list-padding: 4em;
}

.wrapper {
  padding: var(--gutter);
}

.sort-by-director,
.sort-by-title,
.sort-by-year {
  & .category {
    display: flex;
  }
  & .year {
    text-align: right;
    padding-right: 0.5em;
    flex: 0 0 auto;
    & span {
      top: 0;
      position: sticky;
    }
  }
}

.sort-by-year {
  & .year {
    flex-basis: 4em;
  }
}

.sort-by-director,
.sort-by-title {
  & .year {
    flex-basis: 1em;
  }
}

.is-active {
  text-decoration: underline;
}

.category {
  position: relative;
}

.year {
  font-family: var(--font-family-headings);
}

ul {
  list-style: none outside;
  padding: 0;
}

p {
  max-width: 75ch;
}

strong {
  font-weight: 700;
}

.flip-list-move {
  transition: transform 1s;
}

button {
  margin-left: 0.25em;
}

ul {
  flex: 0 1 100%;
}
</style>
