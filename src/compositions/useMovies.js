import { readonly } from 'vue';
import movies from '@/data/movies.json';

export default () => {
  const list = readonly(movies);

  return {
    list,
  };
};
