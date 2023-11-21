<script setup lang="ts">
import UiDivider from '@/components/ui/UiDivider.vue';
import { useTodoStore } from '@/stores/todo';
import TodoList from '@/components/TodoList.vue';
import { ref } from 'vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';

const todoStore = useTodoStore();

const isComplededVisible = ref(false);
</script>

<template>
  <section class="px-container">
    <button
      class="mb-3 flex items-center gap-3 p-1 text-regular text-gray-light"
      :aria-expanded="isComplededVisible"
      aria-controls="completed-todo-list"
      @click="isComplededVisible = !isComplededVisible"
    >
      <IconChevronDown
        aria-hidden="true"
        :class="isComplededVisible ? 'rotate-0' : '-rotate-90'"
        class="h-3 w-3 transition-transform"
      />
      {{ todoStore.completedTodosList.length }} Done
    </button>
    <Transition
      enter-active-class="duration-100 ease-out origin-top"
      enter-from-class="opacity-0 scale-y-75"
      enter-to-class="opacity-100 scale-y-100"
      leave-active-class="duration-100 ease-in origin-top"
      leave-from-class="opacity-100 scale-y-100"
      leave-to-class="opacity-0 scale-y-75"
    >
      <TodoList
        v-show="isComplededVisible"
        id="completed-todo-list"
        :list="todoStore.completedTodosList"
      />
    </Transition>
  </section>
  <UiDivider class="my-3" />
  <section class="px-container">
    <TodoList :list="todoStore.openTodosList" />
  </section>
</template>
