<script setup lang="ts">
import { type PropType, ref, watch } from 'vue';
import { formatTimeAgo } from '@vueuse/core';
import { TodoType, type TodoItem } from '@/types/types';
import checkboxIcon from '@/assets/icons/checkmark.svg?raw';
import UiActionMenu from '@/components/ui/UiActionMenu.vue';
import UiButton from '@/components/ui/UiButton.vue';

const props = defineProps({
  item: {
    type: Object as PropType<TodoItem>,
    required: true,
  },
});

const emit = defineEmits(['toggle', 'delete', 'move']);

const isChecked = ref(props.item.isCompleted);

watch(isChecked, () => {
  emit('toggle');
});

const actions = [
  {
    label: 'Delete',
    action: 'delete',
  },
  {
    label: 'Move To Backlog',
    action: 'move',
  },
] as const;
type ActionsType = (typeof actions)[number]['action'];
</script>

<template>
  <div class="flex items-start gap-2">
    <input
      :id="item.id"
      v-model="isChecked"
      type="checkbox"
      :style="`background-image: url('data:image/svg+xml,${encodeURIComponent(checkboxIcon)}`"
      class="h-6 w-6 flex-none cursor-pointer appearance-none rounded-full border border-gray-light bg-[length:0] bg-center bg-no-repeat shadow transition-all checked:border-blue checked:bg-blue checked:bg-[length:0.75rem]"
    />
    <label :for="item.id">
      <div
        class="my-0.5 text-regular"
        :class="{ 'text-gray-dark line-through': item.isCompleted }"
      >
        {{ props.item.text }}
      </div>
      <div class="text-xxs text-gray-dark">{{ formatTimeAgo(new Date(props.item.date)) }}</div>
    </label>
    <div class="ml-auto">
      <UiButton
        v-if="item.type === TodoType.Backlog"
        small
        secondary
        @click="emit('move')"
        >Move to List</UiButton
      >
      <UiActionMenu
        v-else-if="item.isCompleted === false"
        :actions="[...actions]"
        @click:action="(action) => action && emit(action as ActionsType)"
      />
    </div>
  </div>
</template>
