<script setup>
const { $apiFetcher } = useNuxtApp();

/**
 * * Layouts
 */
definePageMeta({
  layout: "admin",
});

/**
 * * Variables
 */
const productsData = ref([]);
const isLoading = ref(true);

/**
 * * Methods
 */
const fetchProducts = async () => {

  try {
    const { data, error } = await $apiFetcher.customProduct.findAll();

    if (data) {
      productsData.value = data.value;
      isLoading.value = false;
    }
  } catch (error) {
    console.error(error);
  }
};

await fetchProducts();
</script>

<template>
  <div>
    <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorem voluptas quam illo quis, enim ipsum placeat accusantium corrupti minima?</p>
  
    <p v-if="isLoading" class="mt-4 text-dark text-3xl">Loading Fetch API</p>

    <ul v-if="!isLoading" class="list-disc mt-5 ml-12">
      <li v-if="productsData && productsData.length > 0" v-for="(p, index) in productsData" :key="index">{{ p.title }}</li>
    </ul>
  </div>
</template>
