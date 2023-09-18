<script setup>
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * * Layouts
 */
definePageMeta({
  layout: "admin",
});

/**
 * * Variables
 */
const paginateData = ref({
  total: 100,
  paginateRow: 10,
  pageActive: 1
});
const tableData = ref({
  dataColumns: [
    {
      name: 'Nama',
      value: 'name'
    },
    {
      name: 'id',
      // value: (row) => {
      //   return (
      //     `<div class="inline">
      //       <span class="inline font-semibold text-danger bg-lightDanger rounded px-2.5 py-0.5">Database ID: ${row?.id}</span>
      //     </div>`
      //   )
      // }
      value: (row) => {
        return (
          `<div class="flex flex-col gap-1">
            <div>${row?.name}</div>
            <div>089999999999</div>
            <div>${row?.name}@gmail.com</div>
          </div>`
        );
      }
    },
    {
      name: 'Umur',
      value: (row) => {
        return row?.age + ' tahun'
      }
    },
  ],
  dataRows: [
    {
      id: 1,
      name: "Agito",
      age: 20
    },
    {
      id: 2,
      name: "Ryuki",
      age: 19
    },
    {
      id: 3,
      name: "Blade",
      age: 17
    }
  ]
});

/**
 * * Methods
 */
const onPaginateChange = (data) => {

  console.log('data emited', data);

  paginateData.value = data;
}
</script>

<template>
  <div class="container flex my-2">
    <h3 class="text-2xl font-semibold capitalize">Data lorem ipsum</h3>
  </div>

  <hr class="mt-5 mb-3">

  <div>
    <BaseTableDefault
      :data="tableData"
      :actions="[
        'detail', 'delete'
      ]"
      @onDetail="(data) => console.log('detail', data)"
      @onDelete="(data) => console.log('delete', data)"
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