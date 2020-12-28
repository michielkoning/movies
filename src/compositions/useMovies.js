import { computed } from 'vue';
import movies from '@/data/movies.json';

export default () => {
  // const movies = readonly(movies);
  const averageScore = computed(() => {
    const score =
      movies.reduce((prev, current) => prev + current.imdbRating, 0) /
      movies.length;

    return Math.round(score * 10) / 10;
  });

  const worstMovies = computed(() => {
    const lowestScore = movies.reduce(
      (min, movie) => (movie.imdbRating < min ? movie.imdbRating : min),
      10,
    );

    return movies.filter(movie => movie.imdbRating === lowestScore);
  });
  const bestMovies = computed(() => {
    const highestScore = movies.reduce(
      (max, movie) => (movie.imdbRating > max ? movie.imdbRating : max),
      0,
    );

    return movies.filter(movie => movie.imdbRating === highestScore);
  });

  const actors = computed(() => {
    let newArray = [];
    movies.forEach(item => {
      newArray = [...newArray, ...item.Actors];
    });
    return newArray;
  });

  return {
    movies,
    averageScore,
    actors,
    worstMovies,
    bestMovies,
  };
};
