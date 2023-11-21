<script setup lang="ts">
import { type PropType } from 'vue';
import type { TodoItem as TodoItemType } from '@/types/types';
import { useTodoStore } from '@/stores/todo';
import TodoItem from '@/components/TodoItem.vue';

const todoStore = useTodoStore();

const props = defineProps({
  list: {
    type: Object as PropType<TodoItemType[]>,
    required: true,
  },
});
</script>

<template>
  <ul
    v-if="props.list.length"
    class="relative flex flex-col gap-4"
  >
    <TransitionGroup
      enter-active-class="duration-200 ease-out"
      enter-from-class="translate-y-6 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="duration-200 ease-in absolute w-full"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-6 opacity-0"
      move-class="duration-200 ease"
      appear
    >
      <li
        v-for="item in props.list"
        :key="item.id"
      >
        <TodoItem
          :item="item"
          @toggle="todoStore.toggleItem(item.id)"
          @delete="todoStore.deleteItem(item.id)"
          @move="todoStore.moveItem(item.id)"
        />
      </li>
    </TransitionGroup>
  </ul>
  <p
    v-else
    class="text-regular text-gray"
  >
    No items
  </p>
</template>
