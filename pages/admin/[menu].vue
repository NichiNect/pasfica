<script setup>

/**
 * * Layouts
 */
 definePageMeta({
  layout: "admin",
});

/**
 * * Variables
 */
const route = useRoute();
const routeParams = route.params?.menu;

</script>

<template>
  <div class="text-center">
    {{ 'Admin/' + routeParams }}
  </div>
</template>
