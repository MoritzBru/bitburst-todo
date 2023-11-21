<script setup lang="ts">
const props = defineProps({
  small: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    v-bind="$attrs"
    :class="[
      'rounded border font-medium transition-colors disabled:border-gray disabled:bg-gray-light',
      props.small ? 'px-3 py-2 text-small' : 'px-4 py-3 text-regular',
      props.secondary
        ? 'border-gray-light bg-white text-blue hover:border-gray-dark hover:text-blue-dark focus-visible:border-gray-dark focus-visible:text-blue-dark'
        : 'border-blue-dark bg-blue text-white hover:border-blue hover:bg-blue-light focus-visible:border-blue focus-visible:bg-blue-light',
    ]"
  >
    <slot />
  </button>
</template>
