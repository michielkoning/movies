import { computed } from 'vue';
import movies from '@/data/movies.json';

export default () => {
  // const movies = readonly(movies);
  const averageScore = computed(() => {
    const score =
      movies.reduce((prev, current) => prev + current.rating, 0) /
      movies.length;

    return Math.round(score * 10) / 10;
  });

  const worstMovies = computed(() => {
    const lowestScore = movies.reduce(
      (min, movie) => (movie.rating < min ? movie.rating : min),
      10,
    );

    return movies.filter(movie => movie.rating === lowestScore);
  });
  const bestMovies = computed(() => {
    const highestScore = movies.reduce(
      (max, movie) => (movie.rating > max ? movie.rating : max),
      0,
    );

    return movies.filter(movie => movie.rating === highestScore);
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
