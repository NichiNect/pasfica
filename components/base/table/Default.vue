<script setup>
import { faEye, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const props = defineProps(['withoutSearch', 'actions']);
const emit = defineEmits(["onClose"]);

const modalDetailShow = ref(false);
const modalDeleteShow = ref(false);
const rowActive = ref(null);

const dataTable = reactive({
  dataColumns: [
    {
      name: 'Nama',
      value: 'name'
    },
    {
      name: 'id',
      value: 'id'
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
const modalDetailHandler = (row) => {
  modalDetailShow.value = !modalDetailShow.value;
  console.log(row);

  if (modalDetailShow.value == true) {
    rowActive.value = row?.id;
  }

  // do something..
}

const modalDeleteHandler = (row) => {
  modalDeleteShow.value = !modalDeleteShow.value;

  if (modalDeleteShow.value == true) {
    rowActive.value = row?.id;
  }
}

const confirmDelete = () => {
  console.log('confirm clicked', rowActive.value);

  // do something..

  rowActive.value = null;
  modalDeleteShow.value = false;
}

/**
 * * Hooks & Watcher
 */
watch([modalDeleteShow, modalDetailShow], (newValue, oldValue) => {
  // console.log('new', {
  //   delete: newValue[0],
  //   detail: newValue[1],
  // });
  // console.log('old', {
  //   delete: oldValue[0],
  //   detail: oldValue[1],
  // });

  if (newValue[0] != oldValue[0]) {

    if (modalDeleteShow.value == false) {
      rowActive.value = null;
    }
  }

  if (newValue[1] != oldValue[1]) {

    if (modalDetailShow.value == false) {
      rowActive.value = null;
    }
  }
});
</script>

<template>
  <div class="container my-2">
    <div class="grid grid-cols-2 gap-2 items-center">
      <div class="col-span-2 md:col-span-1">
        <slot name="topLeftElement" />
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex md:justify-end items-center">
          <slot name="topRightElement" />

          <div v-if="!props.withoutSearch" class="w-1/3 -translate-y-1">
            <BaseInputDefault
              name="search"
              placeholder="Search.."
              iconPosition="right"
              :icon="faSearch"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-auto my-2">
      <div v-if="dataTable?.dataColumns">
        <table class="table">
          <thead>
            <tr>
              <th class="font-semibold">#</th>
              <th v-for="(column, index) in dataTable?.dataColumns" :key="index">
                {{ column.name }}
              </th>
              <th v-if="Array.isArray(props?.actions) && props?.actions?.length > 0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-if="dataTable?.dataRows || dataTable?.dataRows?.length > 0" 
              v-for="(row, indexRow) in dataTable?.dataRows" :key="indexRow" :dataId="row?.id"
            >
              <td>{{ indexRow + 1 }}</td>
              <td v-for="(column, indexColumn) in dataTable?.dataColumns" :key="indexColumn">
                <span v-if="typeof column['value'] == 'function'">
                  {{ column['value'](row) }}
                </span>
                <span v-else>
                  {{ row[column['value']] }}
                </span>
              </td>
              <td 
                v-if="Array.isArray(props?.actions) && props?.actions?.length > 0"
                class="inline-flex items-center gap-2"
              >
                <div v-if="props?.actions?.includes('detail')">
                  <BaseButton
                    variant="light"
                    color="secondary"
                    size="xs"
                    @onClick="modalDetailHandler(row)"
                  >
                    <FontAwesomeIcon :icon="faEye" />
                  </BaseButton>
                  <BaseModalSide
                    :show="modalDetailShow"
                    width="40%"
                    @onClose="() => modalDetailShow = false"
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
                <div v-if="props?.actions?.includes('delete')">
                  <BaseButton
                    variant="light"
                    color="danger"
                    size="xs"
                    @onClick="modalDeleteHandler(row)"
                  >
                    <FontAwesomeIcon :icon="faTrash" />
                  </BaseButton>
                  <BaseModalConfirm 
                    :show="modalDeleteShow"
                    :noAction="false"
                    @onClose="() => modalDeleteShow = false"
                    @onSubmit="confirmDelete"
                  >
                    <template #title>Are you sure to delete this data?</template>

                    <!-- <template #content>
                      <p class="text-center">Are you sure to delete this data?</p>
                    </template> -->
                  </BaseModalConfirm>
                </div>
              </td>
            </tr>
            <tr v-else>
              <td :colspan="dataTable?.dataColumns?.length + 1">
                <div class="flex flex-col justify-center items-center my-3">
                  <img src="/svg/no-data.svg" alt="Data not Found" class="w-1/4">
                  <h5 class="my-7 text-2xl font-bold">Data Not Found</h5>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
