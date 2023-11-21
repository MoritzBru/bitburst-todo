<script setup lang="ts">
import { ref, computed } from 'vue';
import { refDebounced } from '@vueuse/core';
import { useTodoStore } from '@/stores/todo';
import TodoList from '@/components/TodoList.vue';
import UiInput from '@/components/ui/UiInput.vue';
import UiButton from '@/components/ui/UiButton.vue';
import type { TodoItem } from '@/types/types';

const SEARCH_DEBOUNCE_IN_MS = 300;

const todoStore = useTodoStore();

const searchTerm = ref('');
const searchTermDebounced = refDebounced(searchTerm, SEARCH_DEBOUNCE_IN_MS);

enum SortByOptions {
  Text = 'text',
  Date = 'date',
}

const sortBy = ref<Extract<keyof TodoItem, `${SortByOptions}`> | null>(null);

const sortFunctionLookup = {
  text: (a: TodoItem, b: TodoItem) => {
    const textA = a.text.toLowerCase();
    const textB = b.text.toLowerCase();
    if (textA < textB) return -1;
    if (textA > textB) return 1;
    return 0;
  },
  date: (a: TodoItem, b: TodoItem) => a.date - b.date,
};

const list = computed(() => {
  let list = [...todoStore.backlogList];
  if (searchTermDebounced.value) {
    list = list.filter((item) =>
      item.text.toLowerCase().includes(searchTermDebounced.value.toLowerCase()),
    );
  }

  if (sortBy.value) {
    list.sort(sortFunctionLookup[sortBy.value]);
  }

  return list;
});
</script>

<template>
  <section class="px-container">
    <div class="mb-4 flex w-full flex-wrap gap-4">
      <UiInput
        v-model="searchTerm"
        type="search"
        name="search"
        placeholder="Search"
        class="basis-full sm:basis-auto"
      />
      <UiButton
        class="grow sm:grow-0"
        :disabled="sortBy === SortByOptions.Text"
        @click="() => (sortBy = SortByOptions.Text)"
      >
        Sort by Name
      </UiButton>
      <UiButton
        class="grow sm:grow-0"
        :disabled="sortBy === SortByOptions.Date"
        @click="() => (sortBy = SortByOptions.Date)"
      >
        Sort by Date
      </UiButton>
    </div>
    <TodoList :list="list" />
  </section>
</template>
