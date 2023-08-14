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
const modalConfirmShow = ref(false);
const modalSideShow = ref(false);

/**
 * * Methods
 */
const modalDefaultHandler = () => {
  modalDefaultShow.value = true;
}
const modalConfirmHandler = () => {
  modalConfirmShow.value = true;
}
const modalConfirmSubmitHandler = (e) => {
  console.log('Modal onSubmit Clicked!!');
  modalConfirmShow.value = false;
}
const modalSideHandler = () => {
  modalSideShow.value = true;
}
</script>

<template>
  <div class="container flex flex-wrap items-center mx-auto my-5 gap-5">
    <button class="py-4 px-3 bg-primary hover:bg-opacity-70 text-white rounded" @click="modalDefaultHandler">Modal Default</button>
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
          <button class="py-2 px-3 bg-danger hover:opacity-70 text-white rounded">No</button>
          <button class="py-2 px-3 bg-primary hover:opacity-70 text-white rounded">Yes</button>
        </div>
      </template>
    </BaseModalDefault>

    <button class="py-4 px-3 bg-primary hover:bg-opacity-70 text-white rounded" @click="modalConfirmHandler">Modal Confirm</button>
    <BaseModalConfirm 
      :show="modalConfirmShow"
      :noAction="false"
      @onClose="() => modalConfirmShow = false"
      @onSubmit="modalConfirmSubmitHandler"
    >
      <template #title>Title Modal Confirm</template>

      <template #content>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, expedita cumque. Enim rerum quidem odit. Minus, cumque quidem vitae dolores iusto corporis sed nihil facilis reprehenderit, eos voluptate perspiciatis accusamus?</p>
      </template>
    </BaseModalConfirm>

    <button class="py-4 px-3 bg-primary hover:bg-opacity-70 text-white rounded" @click="modalSideHandler">Modal Side</button>
    <BaseModalSide
      :show="modalSideShow"
      width="40%"
      @onClose="() => modalSideShow = false"
    >
      <template #title>
          <h6 class='text-xl font-semibold text-gray-600'>Title Modal Side</h6>
          <p class='text-md text-gray-400 leading-4 mt-1'>Lorem ipsum dolor sit amet consectetur.</p>
        </template>

        <template #content>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, expedita cumque. Enim rerum quidem odit. Minus, cumque quidem vitae dolores iusto corporis sed nihil facilis reprehenderit, eos voluptate perspiciatis accusamus?</p>
        </template>

        <template #footer>
          <div class='flex justify-end gap-4'>
            <button class="py-2 px-3 bg-danger hover:opacity-70 text-white rounded">No</button>
            <button class="py-2 px-3 bg-primary hover:opacity-70 text-white rounded">Yes</button>
          </div>
        </template>
    </BaseModalSide>
  </div>
</template>
