<script setup>
/**
 * * Variables
 */
const props = defineProps(['border', 'class', 'withTitle']);
</script>

<template>
  <div :class="[
    'border border-b-2 rounded-lg shadow-md',
    props.border ? props.border : 'border-gray-300',
    props.class ? props.class : ''
  ]">
    <div v-if="props.withTitle" class="px-5 pt-5 pb-3 font-semibold">
      <slot name="title" />
    </div>
    <div :class="[
      'px-5',
      props.withTitle ? 'pb-5' : 'py-5'
    ]">
      <slot name="body" />
    </div>
  </div>
</template>
