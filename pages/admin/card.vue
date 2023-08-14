<script setup>

/**
 * * Layouts
 */
 definePageMeta({
  layout: "admin",
});

</script>

<template>
  <div class="container flex flex-wrap items-center mx-auto my-5 gap-5">
    <BaseCard class="w-1/4">
      <template #title>
        <p>Card Title</p>
      </template>
      <template #body>
        <div>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, culpa explicabo non a ullam similique cumque commodi quidem, consequuntur reprehenderit tempore autem doloribus vel sunt ipsa sint amet ab quibusdam.
        </div>
      </template>
    </BaseCard>
    <BaseCard class="w-1/4" border="border-primary">
      <template #title>
        <p>Card Title 2</p>
      </template>
      <template #body>
        <div>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, culpa explicabo non a ullam similique cumque commodi quidem, consequuntur reprehenderit tempore autem doloribus vel sunt ipsa sint amet ab quibusdam.
        </div>
      </template>
    </BaseCard>
    <BaseCard class="w-1/4 bg-secondary text-white" border="border-secondary">
      <template #title>
        <p>Card Title 2</p>
      </template>
      <template #body>
        <div>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, culpa explicabo non a ullam similique cumque commodi quidem
        </div>
      </template>
    </BaseCard>
  </div>
</template>
