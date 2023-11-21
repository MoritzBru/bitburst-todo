import { computed } from 'vue';
import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
import { type TodoItem, TodoType } from '@/types/types';
import { useStorage } from '@vueuse/core';

export const useTodoStore = defineStore('todo', () => {
  // state
  const todosList = useStorage<TodoItem[]>('todo', []);

  // computed
  const openTodosList = computed(() =>
    todosList.value.filter(
      ({ isCompleted, type }) => type === TodoType.Todo && isCompleted === false,
    ),
  );
  const completedTodosList = computed(() =>
    todosList.value.filter(
      ({ isCompleted, type }) => type === TodoType.Todo && isCompleted === true,
    ),
  );
  const backlogList = computed(() =>
    todosList.value.filter(({ type }) => type === TodoType.Backlog),
  );

  // actions
  function addItem(text: string, type: TodoType) {
    const newItem: TodoItem = {
      id: nanoid(),
      date: Date.now(),
      text,
      isCompleted: false,
      type,
    };

    todosList.value = [...todosList.value, newItem];
  }

  function toggleItem(itemId: string) {
    const item = todosList.value.find(({ id }) => id === itemId);

    if (item) {
      item.isCompleted = !item.isCompleted;
      item.type = TodoType.Todo;
    }
  }

  function moveItem(itemId: string) {
    const item = todosList.value.find(({ id }) => id === itemId);

    if (item?.type === TodoType.Backlog) {
      item.type = TodoType.Todo;
    } else if (item?.type === TodoType.Todo) {
      item.type = TodoType.Backlog;
      item.isCompleted = false;
    }
  }

  function deleteItem(itemId: string) {
    todosList.value = todosList.value.filter(({ id }) => id !== itemId);
  }

  return {
    todosList,
    openTodosList,
    completedTodosList,
    backlogList,
    addItem,
    toggleItem,
    moveItem,
    deleteItem,
  };
});
