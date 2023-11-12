<script setup>

const { $toast } = useNuxtApp();

/**
 * * Layouts
 */
definePageMeta({
  layout: "admin",
});

/**
 * * Variables
 */

/**
 * * Methods
 */
const toast1ClickHandler = () => {
  $toast.success('Test toast');
}
const toast2ClickHandler = () => {
  $toast.error('Test toast danger');
}
const toast3ClickHandler = () => {
  $toast.warning('Test toast warning');
}
</script>

<template>
  <div class="container flex flex-wrap items-center mx-auto my-5 gap-5">
    <BaseButton
      label="Toast 1"
      variant="solid"
      color="primary"
      size="md"
      @onClick="toast1ClickHandler"
    />

    <BaseButton
      label="Toast 2"
      variant="solid"
      color="danger"
      size="md"
      @onClick="toast2ClickHandler"
    />

    <BaseButton
      label="Toast 3"
      variant="solid"
      color="secondary"
      size="md"
      @onClick="toast3ClickHandler"
    />
  </div>
</template>
