<script setup>
import { faCamera } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'disabled', 'aspect'
]);
const emit = defineEmits(['onChange']);

const dragActive = ref(false);
const imageValid = ref(true);
const image = ref(false);
const inputFileRef = ref(null);

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

const dropHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();

  dragActive.value = false;
  
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {

    inputFileRef.value = e.dataTransfer.files[0];
    onChangeFileHandler(e);
  }
}

const onChangeFileHandler = async (e) => {
  
  const imgFile = e.target.files ? e.target.files[0] : inputFileRef.value;

  const allowedExtension = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg",
  ];

  const isValid = allowedExtension.includes(inputFileRef.value?.type);
  imageValid.value = isValid;

  // * Do preview
  image.value = imgFile ? URL.createObjectURL(imgFile) : '';

  emit('onChange', imgFile);
}

</script>

<template>
  <div class="relative">
    
    <label 
      :for="props.name" 
      class="font-medium-block mb-2"
    >
      <div v-if="props.label" class="mb-3 font-semibold ml-1">{{ props.label }}</div>

      <div
        :style="{
          backgroundImage: `URL(${image})`,
          filter: 'brightness(0.9)',
          aspectRatio: aspect
        }"
        :class="[
          'relative flex flex-col gap-y-5 justify-center items-center m-auto rounded-lg bg-cover bg-no-repeat',
          'border-b-[3px] bg-background',
          dragActive ? 'border-primary' : 'border-gray-300',
          `text-gray-400 w-80 aspect-${aspect ? aspect : 'video'}`,
          props.disabled ? '' : 'cursor-pointer',
          !imageValid ? 'outline-danger' : ''
        ]"
        :name="props.name"
        @dragenter="dragEnterHandler"
      >
        
        <FontAwesomeIcon v-if="image" :icon="faCamera" class="text-3xl" />
        <div v-else class="text-center">
          <FontAwesomeIcon :icon="faCamera" class="text-3xl" />
          <p class="font-semibold">{{ dragActive ? "Drop here" : "Choose image" }}</p>
        </div>
      </div>

      <input 
        type="file"
        ref="inputFileRef"
        :id="props.name"
        :name="props.name"
        class="hidden"
        :disabled="props.disabled ? true : false"
        @change="onChangeFileHandler"
        />

      <div
        v-if="dragActive"
        class="absolute w-full h-full top-0 left-0"
        @dragenter="dragEnterHandler"
        @dragover="dragEnterHandler"
        @dragleave="dragEnterHandler"
        @drop="dropHandler"
      ></div>
    </label>
  </div>
</template>