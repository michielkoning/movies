import axios from 'axios';

const groupByKey = (group, result, movie) => {
  if (!result[group]) {
    result[group] = { group, children: [movie] };
    // if there is no property in accumulator with this letter create it
    // if there is push current element to children array for that letter
  } else {
    result[group].children.push(movie);
  }
  // return accumulator
  return result;
};

const moduleState = {
  list: [],
};

const getters = {
  averageScore: state => state.list.reduce((prev, current) => prev + current.imdbRating, 0) / state.list.length,
  lowestScore: state => state.list.reduce((min, movie) => (movie.imdbRating < min ? movie.imdbRating : min), 10),
  highestScore: state => state.list.reduce((max, movie) => (movie.imdbRating > max ? movie.imdbRating : max), 0),
  worstMovies: (state, getter) => state.list.filter(movie => movie.imdbRating === getter.lowestScore),
  bestMovies: (state, getter) => state.list.filter(movie => movie.imdbRating === getter.highestScore),
  actors: (state) => {
    let newArray = [];
    state.list.forEach((item) => {
      newArray = [...newArray, ...item.Actors];
    });
    return newArray;
  },

  sortByTitle: (state) => {
    const list = state.list.sort((a, b) => {
      if (a.Title < b.Title) {
        return -1;
      }
      if (a.Title > b.Title) {
        return 1;
      }
      return 0;
    });
    return list.reduce((result, movie) => groupByKey(movie.Title[0], result, movie), {});
  },
  getMovieById: state => slug => state.list.find(movie => movie.slug === slug),
};

const mutations = {
  set: (state, payload) => {
    const newState = state;
    newState.list = payload;
  },
};

const actions = {
  set: async ({ commit }) => {
    try {
      const response = await axios.get('/data/movies.json');
      commit('set', response.data);
    } catch (error) {
      window.console.error(error);
    } finally {
      // this.isLoading = false;
    }
  },
};

export default {
  state: moduleState,
  mutations,
  getters,
  actions,
  namespaced: true,
};
