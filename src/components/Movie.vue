<template>
  <div>
    <router-link :to="{name: 'details', params: { slug: movie.Slug }}">
      <strong>{{ movie.Title }}</strong><br>
      {{ fullName }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fullName() {
      const { Director } = this.movie;
      if (Director.MiddleName) {
        return `${Director.FirstName} ${Director.MiddleName} ${
          Director.LastName
        } `;
      }
      return `${Director.FirstName} ${Director.LastName} `;
    },
  },
};
</script>

<style lang="postcss" scoped>
.content {
  display: grid;
  grid-template-columns: 5em auto;
  grid-gap: 1em;
}

a {
  text-decoration: none;
  display: block;
}
</style>
