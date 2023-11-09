<script setup>
/**
 * * Variables
 */
const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'disabled', 'validations', 'errors'
]);
const emit = defineEmits(['onFocus', 'onBlur', 'onChange']);

const focus = ref(false);
const invalid = ref(null);
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
  // emit('onChange', inputValue.value);
}

/**
 * * Hooks & Watcher
 */
onMounted(() => {
  if (props.inputValue) {
    inputValue.value = props.inputValue;
  }

  if (props.errors && props.errors?.length > 0) {
    invalid.value = props.errors[0].message;
  }
});

watch(inputValue, () => {

  if (props.validations) {
   
    const validator = useValidator(props.validations, inputValue.value);
    
    if (validator.length > 0) {
      invalid.value = validator[0];
    } else {
      invalid.value = null;
    }
  }

  emit('onChange', inputValue);
});
</script>

<template>
  <div class="form_control">
    <label v-if="props.label" 
    :for="props.name"
    :class="[
      'font-medium-block mb-4',
      (focus && !invalid) ? 'text-primary' : '',
      invalid ? 'text-danger' : ''
    ]"
    >
      {{ props.label }}
    </label>
  
    <div class="relative">
      <textarea 
          :id="props.name" 
          :name="props.name"
          v-model="inputValue"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :class="[
            'form_control h-[120px] rounded-lg text-lg focus:outline-none transition duration-150 p-4 border border-gray-300',
            invalid ? 'invalid' : ''
          ]"
          @focus="onFocusHandler"
          @blur="onBlurHandler"
          @input="onInputChangeHandler"
        ></textarea>

        <!-- Validations -->
        <div v-if="props.validations" class="text-sm font-base text-danger mt-1 ml-1">
          {{ invalid }}
        </div>
    </div>
  </div>
</template>