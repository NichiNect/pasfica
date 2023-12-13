<script setup>

/**
 * * Variables
 */
const props = defineProps([
  'items', 'active', 'rounded', 'whitespace'
]);
const emit = defineEmits([
  'onChange'
]);
</script>

<template>
  <div :class="['grid grid-flow-col grid-cols-auto border-2 border-gray-300 text-gray-600', props.rounded ? props.rounded : 'rounded']">
    <div 
      v-for="item in props.items" 
      :class="[
        'text-center font-semibold px-6 py-3 hover:cursor-pointer',
        props.whitespace ? 'my-1 mx-1' : '',
        props.rounded ? props.rounded : 'rounded',
        props.active == item ? 'bg-lightPrimary text-primary shadow-md' : 'hover:bg-gray-50'
      ]"
      @click="() => {
        emit('onChange', item);
      }"
    >
      <div>{{ item }}</div>
    </div>
  </div>
</template>
