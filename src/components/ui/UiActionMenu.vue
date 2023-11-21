<script setup lang="ts">
import { ref, type PropType } from 'vue';
import { onClickOutside } from '@vueuse/core';
import UiButton from '@/components/ui/UiButton.vue';
import IconMore from '@/components/icons/IconMore.vue';
import { nanoid } from 'nanoid';

type Action = {
  label: string;
  action: string;
};

const props = defineProps({
  actions: {
    type: Array as PropType<Action[]>,
    required: true,
  },
});

const emit = defineEmits<{
  'click:action': [name: string];
}>();

const id = `action-menu-${nanoid(10)}`;

const isOpen = ref(false);

const dropdownRef = ref<HTMLDivElement | null>(null);
const buttonRef = ref<HTMLButtonElement | null>(null);

const triggerAction = (action: string) => {
  isOpen.value = false;
  emit('click:action', action);
};

onClickOutside(dropdownRef, () => (isOpen.value = false), { ignore: [buttonRef] });
</script>

<template>
  <div class="relative">
    <button
      ref="buttonRef"
      class="rounded-full p-2 text-gray-dark hover:bg-chrome hover:text-black"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      :aria-controls="id"
      @click.stop="isOpen = !isOpen"
    >
      <span class="sr-only">Action menu</span>
      <IconMore
        aria-hidden="true"
        class="h-5 w-5"
      />
    </button>
    <Transition
      enter-active-class="duration-200 ease-out origin-top-right"
      enter-from-class="translate-x-4 opacity-0 scale-y-75"
      enter-to-class="translate-x-0 opacity-100 scale-y-100"
      leave-active-class="duration-200 ease-in origin-top-right"
      leave-from-class="translate-x-0 opacity-100 scale-y-100"
      leave-to-class="translate-x-4 opacity-0 scale-y-75"
    >
      <div
        v-show="isOpen"
        :id="id"
        ref="dropdownRef"
        role="menu"
        class="absolute right-10 top-0.5 flex w-max flex-col"
      >
        <UiButton
          v-for="(action, index) in props.actions"
          :key="index"
          :class="index > 0 ? 'rounded-t-none border-t-0' : 'rounded-b-none'"
          class="text-left"
          small
          secondary
          @click="triggerAction(action.action)"
        >
          {{ action.label }}
        </UiButton>
      </div>
    </Transition>
  </div>
</template>
