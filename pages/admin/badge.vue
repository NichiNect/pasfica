<script setup>
import { faFile } from '@fortawesome/free-solid-svg-icons';

/**
 * * Layouts
 */
definePageMeta({
  layout: "admin",
});


</script>

<template>
  <div class="container mx-auto items-center my-5">
    <div class="flex flex-col gap-10">
      <div class="flex items-start flex-wrap gap-5">

        <BaseBadge
          variant="solid"
          color="primary"
          size="xs"
        >
          Badge 1
        </BaseBadge>
        <BaseBadge
          variant="solid"
          color="lightPrimary"
          size="sm"
        >
          Badge 2
        </BaseBadge>
        <BaseBadge
          variant="solid"
          color="secondary"
          size="md"
        >
          Badge 3
        </BaseBadge>
        <BaseBadge
          variant="solid"
          color="danger"
          size="lg"
        >
          Badge 4
        </BaseBadge>

        <BaseBadge
          variant="outline"
          color="primary"
          size="xs"
        >
          Badge 5
        </BaseBadge>
        <BaseBadge
          variant="outline"
          color="success"
          size="sm"
        >
          <div class="flex justify-center items-center gap-0.5">
            <FontAwesomeIcon :icon="faFile" class="w-4" />
            Badge 6
          </div>
        </BaseBadge>

        <BaseBadge
          variant="solid"
          color="primary"
          size="md"
          rounded="rounded-full"
        >
          Badge 7
        </BaseBadge>
        <BaseBadge
          variant="outline"
          color="secondary"
          size="lg"
          rounded="rounded-full"
        >
          Badge 8
        </BaseBadge>
      </div>
    </div>
  </div>
</template>