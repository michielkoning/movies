import { readonly, computed } from 'vue';
import movies from '@/data/movies.json';

export default () => {
  const list = readonly(movies);
  const averageScore = computed(() => {
    const score =
      list.reduce((prev, current) => prev + current.imdbRating, 0) /
      list.length;

    return Math.round(score * 10) / 10;
  });

  const worstMovies = computed(() => {
    const lowestScore = list.reduce(
      (min, movie) => (movie.imdbRating < min ? movie.imdbRating : min),
      10,
    );

    return list.filter(movie => movie.imdbRating === lowestScore);
  });
  const bestMovies = computed(() => {
    const highestScore = list.reduce(
      (max, movie) => (movie.imdbRating > max ? movie.imdbRating : max),
      0,
    );

    return list.filter(movie => movie.imdbRating === highestScore);
  });

  const actors = computed(() => {
    let newArray = [];
    list.forEach(item => {
      newArray = [...newArray, ...item.Actors];
    });
    return newArray;
  });

  return {
    list,
    averageScore,
    actors,
    worstMovies,
    bestMovies,
  };
};
