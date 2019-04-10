<template>
  <div>
    <strong>{{ movie.Title }}</strong><br>
    {{ fullName }}
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
