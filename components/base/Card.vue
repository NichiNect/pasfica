<script setup>
/**
 * * Variables
 */
const props = defineProps(['border', 'class']);
</script>

<template>
  <div :class="[
    'border border-b-2 rounded-lg shadow-md',
    props.border ? props.border : 'border-gray-300',
    props.class ? props.class : ''
  ]">
    <div class="px-5 pt-5 pb-3 font-semibold">
      <slot name="title" />
    </div>
    <div class="px-5 pb-5">
      <slot name="body" />
    </div>
  </div>
</template>
