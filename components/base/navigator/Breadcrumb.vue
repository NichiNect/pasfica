<script setup>
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const props = defineProps([
  'items'
]);

</script>

<template>
  <nav class="w-full overflow-auto rounded py-2 mx-0 whitespace-nowrap">
    <ul class="flex items-center justify-center list-reset text-grey-dark">
      <li>
        <FontAwesomeIcon :icon="faHome" class="mr-2 text-sm" />
      </li>
      <li v-for="(item, idx) in props.items">
        <NuxtLink 
          :to="item.link"
          :class="idx+1 == props.items?.length ? 'text-primary text-sm' : 'text-gray-500 text-sm'"
        >
          {{ item.label }}
          <span v-if="idx+1 != props.items?.length" class="mx-2">
            <FontAwesomeIcon :icon="faChevronRight" />
          </span>
        </NuxtLink>
      </li>
      <!-- <li v-if="idx+1 == props.items?.length">
        <span class="mx-4">
          <FontAwesomeIcon :icon="faChevronRight" />
        </span>
      </li> -->
    </ul>
  </nav>
</template>