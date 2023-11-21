import { createRouter, createWebHistory } from 'vue-router';
import ToDoListView from '@/views/ToDoListView.vue';
import { TodoType } from '@/types/types';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: TodoType.Todo,
      component: ToDoListView,
    },
    {
      path: '/backlog',
      name: TodoType.Backlog,
      component: () => import('@/views/BacklogView.vue'),
    },
  ],
});

export default router;
