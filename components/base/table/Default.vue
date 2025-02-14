<script setup>
import { faEdit, faEye, faSearch, faToggleOff, faToggleOn, faTrash } from '@fortawesome/free-solid-svg-icons';

const { $toast } = useNuxtApp();

/**
 * * Variables
 */
const props = defineProps(['tableName', 'withoutSearch', 'actions', 'customActions', 'data', 'actionDetailUrl', 'actionDeleteUrl', 'searchInput']);
const emit = defineEmits(["onClose", "onDetail", "onEdit", "onDelete", "onSearchChange", "onCustomProcess", "onCustomActiveStatus"]);

const modalDetailShow = ref(false);
const modalDeleteShow = ref(false);
const rowActive = ref(null);
const isLoading = ref(false);

const dataTable = ref({});
const singleData = ref({});
const searchInput = ref('');
/**
 * * Methods
 */
const modalDetailHandler = async (row) => {
  modalDetailShow.value = !modalDetailShow.value;

  if (modalDetailShow.value == true) {
    rowActive.value = row?.id;
  }

  // do something..
  emit('onDetail', row);

  isLoading.value = true;

  try {

    const { data } = await props.actionDetailUrl(row?.id);

    singleData.value = data.value;
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
}

const modalDeleteHandler = (row) => {
  modalDeleteShow.value = !modalDeleteShow.value;

  if (modalDeleteShow.value == true) {
    rowActive.value = row?.id;
  }
}

const confirmDelete = async () => {

  isLoading.value = true;

  try {

    const { data } = await props.actionDeleteUrl(rowActive.value, {
      onResponse({request, response, options}) {
        if (response.status == 200) {
          // success
          $toast.success('Success delete data');
        } else if (response.status == 403) {
          // forbidden
          $toast.error(response._data?.message);
        } else {
          // failed
          $toast.error('Failed to delete data');
        }
      }
    });

  } catch (error) {
  } finally {
    isLoading.value = false;
  }

  emit('onDelete', rowActive.value);

  rowActive.value = null;
  modalDeleteShow.value = false;
}

const editHandler = (row) => {
  emit('onEdit', row);
}

/**
 * * Hooks & Watcher
 */
onMounted(() => {
  
  if (props.data) {
    dataTable.value = props.data;
  }
});

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

watch(searchInput, () => {

  const delaySearch = setTimeout(() => {
    emit('onSearchChange', searchInput);
  }, 1500);

  return () => {
    clearTimeout(delaySearch);
  }
});
</script>

<template>
  <div class="my-2">
    <div class="grid grid-cols-2 gap-2 items-center">
      <div class="col-span-2 md:col-span-1">
        <div class="flex gap-3 justify-end lg:justify-start items-center">
          <slot name="topLeftElement" />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex gap-3 justify-end items-center">
          <slot name="topRightElement" />

          <div v-if="!props.withoutSearch" class="w-1/3 -translate-y-1">
            <BaseInputDefault
              :name="`${props.tableName}search`"
              placeholder="Search.."
              iconPosition="right"
              :inputValue="props.searchInput"
              :icon="faSearch"
              @onChange="(e) => searchInput = e.value"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <slot name="middle" />
    </div>

    <div class="overflow-auto scroll_control my-2">
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
              <td v-for="(column, indexColumn) in dataTable?.dataColumns" :key="indexColumn" class="">
                <span v-if="typeof column['value'] == 'function'">
                  <!-- {{ column['value'](row) }} -->
                  <div v-html="column['value'](row)"></div>
                </span>
                <span v-else>
                  {{ row[column['value']] }}
                </span>
              </td>
              <td 
                v-if="Array.isArray(props?.actions) && props?.actions?.length > 0"
              >
                <div class="flex gap-2">
                  <div v-if="props.customActions && props.customActions?.length > 0" v-for="customAction in props.customActions">
                    <BaseButton
                      variant="squareIcon"
                      :color="customAction?.color ?? 'success'"
                      size="sm"
                      @onClick="() => {
                        emit(`onCustom${customAction?.name?.charAt(0)?.toUpperCase() + customAction?.name?.slice(1)}`, row);
                      }"
                    >
                      <div v-if="customAction.name == 'activeStatus'">
                        <FontAwesomeIcon :icon="row?.active_status ? faToggleOn : faToggleOff" />
                      </div>
                      <div v-else>
                        <FontAwesomeIcon :icon="customAction?.icon" />
                      </div>
                    </BaseButton>
                  </div>
                  <div v-if="props?.actions?.includes('detail')">
                    <BaseButton
                      variant="squareIcon"
                      color="secondary"
                      size="sm"
                      @onClick="modalDetailHandler(row)"
                    >
                      <FontAwesomeIcon :icon="faEye" />
                    </BaseButton>
                  </div>
                  <div v-if="props?.actions?.includes('edit')">
                    <BaseButton
                      variant="squareIcon"
                      color="success"
                      size="sm"
                      @onClick="editHandler(row)"
                    >
                      <FontAwesomeIcon :icon="faEdit" />
                    </BaseButton>
                  </div>
                  <div v-if="props?.actions?.includes('delete')">
                    <BaseButton
                      variant="squareIcon"
                      color="danger"
                      size="sm"
                      @onClick="modalDeleteHandler(row)"
                    >
                      <FontAwesomeIcon :icon="faTrash" />
                    </BaseButton>
                  </div>
                </div>
              </td>
            </tr>

            <tr v-else>
              <td :colspan="props.actions ? dataTable?.dataColumns?.length + 2 : dataTable?.dataColumns?.length + 1">
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

  <!-- Modal -->
  <BaseModalSide
    :show="modalDetailShow"
    width="40%"
    @onClose="() => modalDetailShow = false"
  >
    <template #title>
        <h6 class='text-xl font-semibold text-gray-600'>Detail Product</h6>
        <p v-if="!isLoading" class='text-md text-gray-400 leading-4 mt-1'>{{ singleData.title }}</p>
      </template>

      <template #content>
        <BaseLoading v-if="isLoading" class="py-16" />

        <div v-if="!isLoading" class="grid grid-cols-3 gap-4 mt-8">
          <p class="text-xl font-semibold mr-4 ">Title: </p>
          <p class="col-span-2 text-md font-base">{{ singleData.title }}</p>

          <p class="text-xl font-semibold mr-4 ">Category: </p>
          <p class="col-span-2 text-md font-base">{{ singleData.category }}</p>
          
          <p class="text-xl font-semibold mr-4 ">Description: </p>
          <p class="col-span-2 text-md font-base">{{ singleData.description }}</p>

          <p class="text-xl font-semibold mr-4 ">Price: </p>
          <p class="col-span-2 text-md font-base">${{ singleData.price }}</p>

          <p class="text-xl font-semibold mr-4 ">Rating: </p>
          <div class="col-span-2 text-md font-base">
            <div class="flex flex-col">
              <p>Total: {{ singleData.rating?.count }}</p>
              <p>Rate: {{ singleData.rating?.rate }}</p>
            </div>
          </div>

          <p class="text-xl font-semibold mr-4 ">Picture: </p>
          <p class="col-span-2 w-[70%] mt-4">
            <img :src="singleData.image" :alt="singleData.title" class="object-fill">
          </p>
        </div>
      </template>

      <template #footer>
        <div class='flex justify-end gap-4'>
          <!-- <button class="py-2 px-3 bg-danger hover:opacity-70 text-white rounded">No</button> -->
          <button @click="() => modalDetailShow = false" class="py-2 px-3 bg-primary hover:opacity-70 text-white rounded">Close</button>
        </div>
      </template>
  </BaseModalSide>

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
</template>
