<script setup>
import { faDollar } from '@fortawesome/free-solid-svg-icons';

const { $apiFetcher } = useNuxtApp();
const route = useRoute();

/**
 * * Layouts
 */
definePageMeta({
  layout: "admin",
});

/**
 * * Variables
 */
const routeParam = route.params?.id;
const isLoading = ref(false);
const formProduct = ref({
  title: '',
  category: '',
  description: '',
  price: 0,
  rating: {},
});

/**
 * * Methods
 */
const setFormValue = (data, fieldName) => {
  formProduct.value[fieldName] = data.value;
}

const getDetail = async (id, params = null) => {

  isLoading.value = true;

  try {

    const { data } = await $apiFetcher.customProduct.findOne(id, {
      query: params?.query,
      onResponse({request, response, options}) {
        // console.log('status', response.status);
      }
    });

    // * Setter
    formProduct.value.title = data.value.title;
    formProduct.value.category = data.value.category;
    formProduct.value.price = data.value.price;
    formProduct.value.description = data.value.description;

  } catch (error) {
  } finally {
    isLoading.value = false;
  }

  return;
}

/**
 * * Method Handler
 */
const editSubmitHandler = async () => {

  isLoading.value = true;

  try {

    const { data } = await $apiFetcher.customProduct.update(routeParam, {
      body: formProduct.value,
      onResponse({request, response, options}) {
        if (response.status == 200) {
          // success
          alert('Success edit data');
          navigateTo('/admin/tables/with-api');
        } else {
          // failed
          alert('Failed edit data');
        }
      }
    });

  } catch (error) {
  } finally {
    isLoading.value = false;
  }
}

/**
 * * Init
 */
await getDetail(routeParam);

</script>

<template>
  <div class="container flex my-2">
    <h3 class="text-2xl font-semibold capitalize">Edit Product</h3>
  </div>

  <hr class="mt-5 mb-3">

  <BaseLoading v-if="isLoading" class="p-20" />

  <div v-if="!isLoading" class="container">
    
    <div class="grid grid-cols-1 gap-4">
      <form action="#" @submit.prevent="editSubmitHandler" class="grid grid-cols-1 gap-4">
        <BaseInputDefault
          name="title"
          label="Title"
          placeholder="Fill title.."
          :inputValue="formProduct.title"
          :validations="['required', 'min:5']"
          @onChange="setFormValue($event, 'title')"
        />
        <BaseInputDefault
          name="category"
          label="Category"
          placeholder="Fill category.."
          :inputValue="formProduct.category"
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
          :inputValue="formProduct.price"
          iconPosition="left"
          :icon="faDollar"
          minValue="0"
          @onChange="setFormValue($event, 'price')"
        />
        <BaseInputTextarea
          name="description"
          label="Description"
          placeholder="Fill description.."
          :inputValue="formProduct.description"
          :validations="['min:6']"
          @onChange="setFormValue($event, 'description')"
        />
        <BaseButton
          type="submit"
          label="Edit product"
          color="primary"
          size="md"
          class="w-[20%] ml-auto"
        />
      </form>
    </div>
  </div>
</template>