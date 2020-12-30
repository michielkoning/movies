<template>
  <div class="notch-wrapper">
    <div class="center">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.notch-wrapper {
  padding: var(--notch);
}

.center {
  max-width: 72rem;
  margin: 0 auto;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
}
</style>
