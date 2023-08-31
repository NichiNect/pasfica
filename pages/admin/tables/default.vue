<script setup>
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * * Layouts
 */
definePageMeta({
  layout: "admin",
});
</script>

<template>
  <div class="container flex my-2">
    <h3 class="text-2xl font-semibold capitalize">Data lorem ipsum</h3>
  </div>

  <hr class="mt-5 mb-3">

  <div>
    <BaseTableDefault
      :actions="[
        'detail', 'delete'
      ]"
    >
      <template #topLeftElement>
        <div>
          <BaseButton
            color="primary"
            size="md"
          >
            <FontAwesomeIcon :icon="faPlus" class="mr-1" />
            Add Data
          </BaseButton>
        </div>
      </template>

      <template #topRightElement>
        <div class="mr-2 relative">
          <BaseButton
            color="success"
            size="md"
          >
            Export
          </BaseButton>
        </div>
      </template>
    </BaseTableDefault>
  </div>
</template>