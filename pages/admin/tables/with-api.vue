<script setup>
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

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
const paginateData = ref({
  total: 100,
  paginateRow: 10,
  pageActive: 1
});
const tableData = ref([]);
const queryParams = ref({});

/**
 * * Methods
 */
const getData = async (params) => {

  isLoading.value = true;

  try {

    const { data } = await $apiFetcher.customProduct.findAll({
      query: params?.query,
      onResponse({request, response, options}) {
        // console.log('status', response.status);
      }
    });

    tableData.value = data.value;
    await parseTableData();

  } catch (error) {
  } finally {
    isLoading.value = false;
  }

  return;
}

/**
 * * Method Parser
 */
const parseTableData = async () => {

  tableData.value = {
    dataRows: tableData.value,
    dataColumns: [
      {
        name: 'Title',
        value: 'title'
      },
      {
        name: 'Price',
        value: 'price'
      },
      {
        name: 'Category',
        value: 'category'
      },
      {
        name: 'Rating',
        value: (row) => {
          return row?.rating?.rate;
        }
      },
    ]
  }
}

/**
 * * Method Handler
 */
const onPaginateChange = async (data) => {

  paginateData.value = data;

  queryParams.value = {
    ...queryParams.value,
    page: paginateData.value.pageActive
  }

  await getData({
    query: queryParams.value
  });
}

const onSearchChangeHandler = async (data) => {

  queryParams.value = {
    ...queryParams.value,
    search: data.value
  }

  await getData({
    query: queryParams.value
  });
}

/**
 * * Hooks & Watchers
 */
//  onMounted( async () => {
//   await getData();
// });

/**
 * * Initial
 */
await getData();

</script>

<template>
  <div class="container flex my-2">
    <h3 class="text-2xl font-semibold capitalize">Data Products</h3>
  </div>

  <hr class="mt-5 mb-3">

  <BaseLoading v-if="isLoading" class="p-20" />

  <div v-else>
    <BaseTableDefault
      :data="tableData"
      :actions="[
        'detail', 'delete'
      ]"
      @onDetail="(data) => console.log('detail', data)"
      @onDelete="(data) => console.log('delete', data)"
      @onSearchChange="onSearchChangeHandler"
    >
      <template #topLeftElement>
        <div>
          <BaseButton
            color="primary"
            size="md"
          >
            <FontAwesomeIcon :icon="faPlus" class="mr-1" />
            Add Data
          </BaseButton>
        </div>
      </template>

      <template #topRightElement>
        <div class="mr-2 relative">
          <BaseButton
            color="success"
            size="md"
          >
            Export
          </BaseButton>
        </div>
      </template>
    </BaseTableDefault>
  </div>

  <div class="container my-5">
    <BaseTablePagination 
      :total="paginateData.total"
      :paginateRow="paginateData.paginateRow"
      :pageActive="paginateData.pageActive"
      @onChange="onPaginateChange"
    />
  </div>
</template>