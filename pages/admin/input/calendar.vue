<script setup>
import moment from 'moment';
moment.locale('id');

/**
 * * Layouts
 */
definePageMeta({
  layout: "admin",
});


/**
 * * Variables
 */
const dateRef = ref();


/**
 * * Hooks & Watchers
 */
watch(dateRef, () => {
  console.log(dateRef.value);
});
</script>

<template>
  <div class="container grid grid-cols-2 gap-3 items-center my-5">
    
    <VDatePicker
      :attributes="[{
        highlight: 'blue',
        dates: []
      }]"
      expanded
      mode="date"
      :minDate="new Date()"
      :disabledDates="[
        new Date(2024, 6, 16)
      ]"
      v-model.range="dateRef"
    />
  </div>
</template>
