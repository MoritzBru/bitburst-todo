<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="flex gap-8 text-2.5xl font-bold">
    <RouterLink
      to="/"
      class="nav-item"
      active-class="nav-item--active"
    >
      To Do List
    </RouterLink>
    <RouterLink
      to="/backlog"
      class="nav-item"
      active-class="nav-item--active"
    >
      Backlog
    </RouterLink>
  </nav>
</template>

<style scoped>
.nav-item {
  @apply rounded pb-3 text-gray transition-colors hover:text-black;
  @apply relative pb-3 before:absolute before:inset-x-0 before:bottom-0 before:block before:h-1 before:rounded-full before:bg-transparent before:transition-colors;
}
.nav-item--active {
  @apply text-black;
  @apply before:bg-blue;
}
</style>
