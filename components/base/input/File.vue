<script setup>
import { faFile, faFileArchive, faFileExcel, faFileImage, faFilePdf, faFileWord, faUpload } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
 const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'disabled', 'aspect'
]);
const emit = defineEmits(['onChange']);

const dragActive = ref(false);
const fileUploaded = ref([]);
const inputFileRef = ref(null);
const icon = ref(faUpload);

/**
 * * Methods
 */
const dragEnterHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.type == "dragenter" || e.type == "dragover") {
    dragActive.value = true;
  } else if (e.type == "dragleave") {
    dragActive.value = false;
  }
}

const dropHandler = function (e) {
  e.preventDefault();
  e.stopPropagation();
  
  dragActive.value = false;
  
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {

    inputFileRef.value = e.dataTransfer.files[0];
    onChangeFileHandler(e);
  }
}

const onChangeFileHandler = async (e) => {
  
  const file = e.target.files ? e.target.files[0] : inputFileRef.value;

  // * Do preview
  fileUploaded.value = file ? file : '';

  emit('onChange', file);
}

const getFileIcon = () => {

  const formatFile = {
    pdf: faFilePdf,
    img: faFileImage,
    jpg: faFileImage,
    jpeg: faFileImage,
    svg: faFileImage,
    png: faFileImage,

    xlsx: faFileExcel,
    xls: faFileExcel,
    csv: faFileExcel,
    docx: faFileWord,
    doc: faFileWord,

    zip: faFileArchive,
    rar: faFileArchive,
  }

  const fileName = fileUploaded.value ? fileUploaded.value?.name : '';

  let fileExtension = fileName.split('.').pop();
  fileExtension = fileExtension.toLowerCase();

  if (!formatFile[fileExtension]) {
    return faFile;
  }

  return formatFile[fileExtension];
}

/**
 * * Hooks & Watcher
 */
watch(fileUploaded, () => {
  icon.value = getFileIcon();
});

</script>

<template>
  <div 
    class="p-4 border-2 border-dashed rounded-xl relative"
    @dragenter="dragEnterHandler"
  >
    <label :for="props.name" class="cursor-pointer">
      <div class="mb-2 text-sm font-semibold text-gray-400">{{ label }}</div>

      <div class="text-center border-b-[3px] border-gray-300 border rounded-lg py-10 px-4">
        <FontAwesomeIcon :icon="icon" class="text-3xl text-gray-500" />

        <h6 class="text-sm mt-4 text-gray-500 font-semibold limit__line__2 min-h-[32px] h-[32px] max-h-[32px]">
          {{ fileUploaded?.name ? fileUploaded.name : 'Upload file' }}
        </h6>
      </div>
      
      <input type="file"
          class="hidden"
          :id="props.name"
          :name="props.name"
          ref="inputFileRef"
          @change="onChangeFileHandler"
        />
    </label>

    <div
      v-if="dragActive"
      class="absolute w-full h-full top-0 left-0"
      @dragenter="dragEnterHandler"
      @dragover="dragEnterHandler"
      @dragleave="dragEnterHandler"
      @drop="dropHandler"
    ></div>
  </div>
</template>