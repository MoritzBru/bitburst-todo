<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheNavbar from '@/components/TheNavbar.vue';
import TheForm from '@/components/TheForm.vue';
import UiDivider from '@/components/ui/UiDivider.vue';
import { useTodoStore } from '@/stores/todo';
import { TodoType } from '@/types/types';

const todoStore = useTodoStore();
</script>

<template>
  <div
    class="mx-auto grid h-screen max-w-container grid-rows-[auto_1fr_auto] pb-12 pt-8 text-black"
  >
    <header>
      <TheNavbar class="px-container" />
      <UiDivider />
    </header>
    <!-- TODO: Find better way than px to account for focus cut -->
    <main class="overflow-y-auto px-0 pb-8 pt-3 sm:px-0.5">
      <RouterView />
    </main>
    <footer>
      <TheForm
        class="px-container"
        @add-item="(text) => todoStore.addItem(text, ($route.name as TodoType) ?? TodoType.Todo)"
      />
    </footer>
  </div>
</template>
