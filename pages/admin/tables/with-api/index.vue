<script setup>
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const { $apiFetcher } = useNuxtApp();
const router = useRouter();

/**
 * * Layouts
 */
definePageMeta({
  layout: "admin",
});

/**
 * * Variables
 */
const isLoading = ref({
  list: false,
  detail: false
});
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

  isLoading.value.list = true;

  try {

    const { data } = await $apiFetcher.customProduct.findAll({
      query: {
        ...params?.query,
        // limit: 10
      },
      onResponse({request, response, options}) {
        // console.log('status', response.status);
      }
    });

    tableData.value = data.value;
    await parseTableData();

  } catch (error) {
  } finally {
    isLoading.value.list = false;
  }

  return;
}

// const getDetail = async (id, params = null) => {

//   setTimeout(() => {
//     isLoading.value.detail = true;
//   }, 150);

//   try {

//     const { data } = await $apiFetcher.customProduct.findOne(id, {
//       query: params?.query,
//       onResponse({request, response, options}) {
//         // console.log('status', response.status);
//       }
//     });

//     detailData.value = data.value;

//   } catch (error) {
//   } finally {
//     isLoading.value.detail = false;
//   }

//   return;
// }

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

const onDeleteClickedHandler = async (data) => {
  console.log('delete', data);
  await getData();
}

const onEditClickedHandler = (data) => {
  router.push({ path: `/admin/tables/with-api/update/${data?.id}` });
  // navigateTo(`/admin/tables/with-api/update/${data?.id}`);
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

  <BaseLoading v-if="isLoading.list" class="p-20" />

  <div v-if="!isLoading.list" class="px-4">
    <BaseTableDefault
      :data="tableData"
      :actions="[
        'detail', 'edit', 'delete'
      ]"
      :actionDetailUrl="$apiFetcher.customProduct.findOne"
      :actionDeleteUrl="$apiFetcher.customProduct.delete"
      @onDetail="(data) => console.log('detail', data)"
      @onDelete="onDeleteClickedHandler"
      @onEdit="onEditClickedHandler"
      @onSearchChange="onSearchChangeHandler"
    >
      <template #topLeftElement>
        <div>
          <NuxtLink to="/admin/tables/with-api/create">
            <BaseButton
              color="primary"
              size="md"
            >
              <FontAwesomeIcon :icon="faPlus" class="mr-1" />
              Add Data
            </BaseButton>
          </NuxtLink>
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