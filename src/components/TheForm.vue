<script setup lang="ts">
import { ref } from 'vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiInput from '@/components/ui/UiInput.vue';

const emit = defineEmits<{
  addItem: [text: string];
}>();

const text = ref('');

const addItem = () => {
  if (text.value) {
    emit('addItem', text.value);
    text.value = '';
  }
};
</script>

<template>
  <form
    class="flex w-full gap-4"
    @submit.prevent="addItem"
  >
    <UiInput
      v-model="text"
      type="text"
      name="new-item-text"
      placeholder="Item text…"
    />
    <UiButton :disabled="!text.length"> Add Item </UiButton>
  </form>
</template>
