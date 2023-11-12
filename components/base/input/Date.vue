<script setup>
import moment from 'moment';
moment.locale('id');

/**
 * * Variables
 */
const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'icon', 'iconPosition', 'disabled', 'useFormat', 'mode', 'validations', 'errors'
]);
const emit = defineEmits(['onFocus', 'onBlur', 'onChange']);

const focus = ref(false);
const inputValue = ref('');
const formatDate = ref(null);
const dateRef = ref(new Date());
const invalid = ref(null);

/**
 * * Methods
 */
const changeDate = (e) => {
  // inputValue.value = moment(e.date).format(formatDate.value);
  inputValue.value = moment(dateRef.value).locale('id').format(formatDate.value);
  emit('onChange', inputValue);
}

const onFocusHandler = () => {

  setTimeout(() => {
    focus.value = true;
    emit('onFocus');
  }, 150);
}

const onBlurHandler = () => {

  setTimeout(() => {
    // focus.value = false;
    // emit('onBlur');
  }, 200)
}

/**
 * * Hooks & Watcher
 */
onMounted(() => {

  if (props.useFormat) {
    formatDate.value = props.useFormat;
  } else {
    formatDate.value = "DD-MM-YYYY";
  }

  if (props.inputValue) {
    inputValue.value = moment(props.inputValue).locale('id').format(formatDate.value);
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
});
</script>

<template>
  <div :class="[
    'form_control',
    disabled ? 'opacity-60' : '',
  ]">

    <label 
      :for="props.name"
      :class="[
        (focus && !invalid) ? 'text-primary' : '',
        invalid ? 'text-danger' : ''
      ]"
    >
      {{ props.label }}
    </label>
    
    <div class="relative">
      <input 
        type="text"
        :inputmode="'numeric'"
        :value="inputValue"
        :placeholder="props.placeholder"
        :class="[
          (props.iconPosition == 'right') ? 'pl-5 pr-14' : (props.icon) ? 'pl-16 pr-5' : 'pl-5 pr-5',
          invalid ? 'invalid' : ''
        ]"
        :name="props.name"
        :id="props.name"
        :disabled="props.disabled"
        autocomplete="off"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />

      <FontAwesomeIcon 
        v-if="props.icon" 
        :icon="props.icon" 
        :class="[
          'absolute text-xl top-1/2 -translate-y-1/2',
          (props.iconPosition == 'right') ? 'right-1 mr-5' : 'left-1 ml-5',
          (focus && !invalid) ? 'text-primary' : '',
          invalid ? 'text-danger' : 'text-gray-400'
        ]"
      />

      <div
        v-if="!props.disabled && focus"
        class="text-center"
      >
        <div class="fixed top-0 left-0 z-20 w-full h-full bg-black opacity-30"
          @click="() => {
            focus = false;
          }"
        ></div>
        
        <div :class="[
          'absolute z-30 w-1/2 p-5 bg-white border-2 rounded-lg shadow-lg',
          'right-0 translate-x-1/4'
        ]">

          <VDatePicker
            :attributes="[{
              highlight: 'blue',
              dates: [inputValue ? moment(inputValue, formatDate, true).format() : new Date()]
            }]"
            expanded
            :mode="props.mode"
            v-model="dateRef"
            @update:modelValue="changeDate"
          />
        </div>
      </div>
    </div>

    <!-- Validations -->
    <div v-if="props.validations" class="text-sm font-base text-danger mt-1 ml-1">
      {{ invalid }}
    </div>
  </div>
</template>