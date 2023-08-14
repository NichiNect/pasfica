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
const modalDefaultShow = ref(false);

/**
 * * Methods
 */
const modalDefaultHandler = () => {
  modalDefaultShow.value = true;
}
</script>

<template>
  <div class="container flex flex-wrap items-center mx-auto my-5 gap-5">
    <button class="py-4 px-2 bg-primary hover:bg-opacity-70 text-white rounded" @click="modalDefaultHandler">Modal Default</button>
    <BaseModalDefault 
      :show="modalDefaultShow"
      @onClose="() => modalDefaultShow = false"
    >
      <template #title>
        <h6 class='text-xl font-semibold text-gray-600'>Title Modal Default</h6>
        <p class='text-md text-gray-400 leading-4 mt-1'>Lorem ipsum dolor sit amet consectetur.</p>
      </template>

      <template #content>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, expedita cumque. Enim rerum quidem odit. Minus, cumque quidem vitae dolores iusto corporis sed nihil facilis reprehenderit, eos voluptate perspiciatis accusamus?</p>
      </template>

      <template #footer>
        <div class='flex justify-end gap-4'>
          <button class="py-2 px-3 bg-red-500 hover:opacity-70 text-white rounded">No</button>
          <button class="py-2 px-3 bg-primary hover:opacity-70 text-white rounded">Yes</button>
        </div>
      </template>
    </BaseModalDefault>
  </div>
</template>
