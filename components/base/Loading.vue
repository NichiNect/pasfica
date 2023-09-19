<script setup>
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

</script>

<template>
  <div class="flex justify-center items-center gap-2">
    <FontAwesomeIcon :icon="faSpinner" spin class="text-2xl font-semibold" />
    <div class="text-2xl">Loading...</div>
  </div>
</template>
