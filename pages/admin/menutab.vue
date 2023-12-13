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
const tabActive = ref('Menu 1');

</script>

<template>
  <div class="container flex flex-wrap items-center mx-auto my-5 gap-5">
    <div class="w-1/2">
      <BaseNavigatorMenuTab 
        :items="[
          'Menu 1',
          'Menu 2',
          'Menu 3'
        ]"
        :active="tabActive"
        @onChange="(e) => tabActive = e"
        :whitespace="true"
      />
    </div>
    <div class="w-1/2">
      <BaseNavigatorMenuTab 
        :items="[
          'Menu 1',
          'Menu 2',
          'Menu 3'
        ]"
        :active="tabActive"
        @onChange="(e) => tabActive = e"
        rounded="rounded-full"
        :whitespace="true"
      />
    </div>
  </div>
</template>
