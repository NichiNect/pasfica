<script setup>
/**
 * * Variables
 */
const route = useRoute();
const routeParams = route.params?.menu;

</script>

<template>
  {{ 'Admin/' + routeParams }}
</template>
