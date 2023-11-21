<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits<{
  'update:modelValue': [text: string];
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <input
    v-bind="$attrs"
    v-model="value"
    class="disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 flex-1 rounded border border-gray-light bg-white px-4 py-3 text-regular placeholder-gray-light outline-0 focus:border-blue"
  />
</template>
