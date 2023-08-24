<script setup>
/**
 * * Variables
 */
 const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'disabled', 'useFormat',
]);
const emit = defineEmits(['onFocus', 'onBlur', 'onChange']);

const focus = ref(false);
const inputValue = ref('');

/**
 * * Methods
 */
const onFocusHandler = (e) => {
  focus.value = true;
  emit('onFocus', e);
}

const onBlurHandler = (e) => {
  
  setTimeout(() => {
    focus.value = false;
    emit('onBlur', e);
  }, 100);
}

const onInputChangeHandler = (e) => {

  inputValue.value = e.target.value;
  emit('onChange', inputValue.value);
}

/**
 * * Hooks & Watcher
 */
onMounted(() => {
  if (props.inputValue) {
    inputValue.value = props.inputValue;
  }
});

</script>

<template>
  <div>
    <label v-if="props.label" 
    :for="props.name"
    :class="[
      'font-medium-block mb-2',
      focus ? 'text-primary' : ''
    ]"
    >
      {{ props.label }}
    </label>
  
    <div class="relative">
      <textarea 
          :id="props.name" 
          :name="props.name"
          :placeholder="props.placeholder"
          :disabled="props.disabled ? true : false"
          class="form_control h-[120px] rounded-lg text-lg focus:outline-none transition duration-150 p-4 border border-gray-300"
          @focus="onFocusHandler"
          @blur="onBlurHandler"
          @input="onInputChangeHandler"
        >{{ inputValue }}</textarea>
    </div>
  </div>
</template>