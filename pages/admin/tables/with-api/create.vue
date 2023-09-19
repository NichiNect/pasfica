<script setup>
import { faDollar } from '@fortawesome/free-solid-svg-icons';

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
const isLoading = ref(false);
const formProduct = ref({
  title: '',
  category: '',
  description: '',
  price: 0,
  rating: '',
});

/**
 * * Methods
 */
const setFormValue = (data, fieldName) => {
  // console.log('dat', data);
  // console.log('fieldname', fieldName);
  formProduct.value[fieldName] = data.value;
}

/**
 * * Method Handler
 */
const createSubmitHandler = async () => {

  isLoading.value = true;

  try {

    const { data } = await $apiFetcher.customProduct.create({
      body: formProduct.value,
      onResponse({request, response, options}) {
        if (response.status == 200) {
          // success
          alert('Success create data');
          navigateTo('/admin/tables/with-api');
        } else {
          // failed
          alert('Failed create data');
        }
      }
    });

  } catch (error) {
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <div class="container flex my-2">
    <h3 class="text-2xl font-semibold capitalize">Create Product</h3>
  </div>

  <hr class="mt-5 mb-3">

  <BaseLoading v-if="isLoading" class="p-20" />

  <div v-if="!isLoading" class="container">
    
    <div class="grid grid-cols-1 gap-4">
      <form action="#" @submit.prevent="createSubmitHandler" class="grid grid-cols-1 gap-4">
        <BaseInputDefault
          name="title"
          label="Title"
          placeholder="Fill title.."
          :validations="['required', 'min:5']"
          @onChange="setFormValue($event, 'title')"
        />
        <BaseInputDefault
          name="category"
          label="Category"
          placeholder="Fill category.."
          :suggestionLists="[
            'Electronics', 'Fashion', 'Jewelery',
          ]"
          :validations="['required']"
          @onChange="setFormValue($event, 'category')"
        />
        <BaseInputNumber 
          name="price"
          label="Price"
          placeholder="Fill price number.."
          iconPosition="left"
          :icon="faDollar"
          minValue="0"
          @onChange="setFormValue($event, 'price')"
        />
        <BaseInputTextarea
          name="description"
          label="Description"
          placeholder="Fill description.."
          :validations="['min:6']"
          @onChange="setFormValue($event, 'description')"
        />
        <BaseButton
          type="submit"
          label="Create new product"
          color="primary"
          size="md"
          class="w-[20%] ml-auto"
        />
      </form>
    </div>
  </div>
</template>