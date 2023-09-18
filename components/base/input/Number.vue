<script setup>
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
 const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'icon', 'iconPosition', 'disabled', 'useFormat', 'hideButton', 'minValue', 'maxValue', 'validations'
]);
const emit = defineEmits(['onFocus', 'onBlur', 'onChange']);

const focus = ref(false);
const invalid = ref(null);
const inputValue = ref('');

/**
 * * Methods
 */
const onMouseUpHandler = (type) => {
  if (type == 'increment') {
    inputValue.value = String(parseInt(inputValue.value) + 1);
  } else {
    inputValue.value = String(parseInt(inputValue.value) - 1);
  }

  setTimeout(() => {
    focus.value = true;
  }, 120);
}

const onMouseDownHandler = () => {
  setTimeout(() => {
    focus.value = true;
  }, 120);
}

/**
 * * Hooks & Watcher
 */
 onBeforeMount(() => {
  if (props.inputValue) {
    inputValue.value = props.inputValue;
  } else {
    inputValue.value = '0';
  }
});

watch(inputValue, (current, before) => {

  if (props.minValue) {

    if (current < parseInt(props.minValue)) {
      inputValue.value = before;
    }
  }

  if (props.maxValue) {

    if (current > parseInt(props.maxValue)) {
      inputValue.value = before;
    }
  }

  if (props.validations) {

    const validator = useValidator(props.validations, Number(inputValue.value));

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
  <div :class="[
    'form_control',
    disabled ? 'opacity-60' : '',
  ]">

    <label 
      :for="props.name"
      :class="[
        (focus && !invalid) ? 'text-primary' : '',
        invalid ? 'text-danger': ''
      ]"
    >
      {{ props.label }}
    </label>
    
    <div class="relative">
      <input 
        :inputmode="'numeric'"
        type="text"
        v-model="inputValue"
        :placeholder="props.placeholder"
        :class="[
          (props.iconPosition == 'right') ? 'pl-5 pr-14' : (props.icon) ? 'pl-16 pr-5' : 'pl-5 pr-5',
          invalid ? 'invalid' : ''
        ]"
        :name="props.name"
        :id="props.name"
        :disabled="props.disabled ? true: false"
        autocomplete="off"
        @focus="() => {
          focus = true;
          emit('onFocus');
        }"
        @blur="() => {
          focus = false;
          emit('onBlur');
        }"
        @keyup="(e) => {
          inputValue = e.target.value;
        }"
      />

      <FontAwesomeIcon 
        v-if="props.icon" 
        :icon="props.icon" 
        :class="[
          'absolute text-gray-400 text-xl top-1/2 -translate-y-1/2',
          (props.iconPosition == 'right') ? 'right-1 mr-5' : 'left-1 ml-5',
          (focus && !invalid) ? 'text-primary' : '',
          invalid ? 'text-danger': ''
        ]"
      />

      <div
        v-if="!hideButton && focus"
        :class="[
          'absolute top-1/2 -translate-y-1/2',
          (iconPosition == 'right') ? 'right-1 mr-14' : 'right-1 mr-4'
        ]"
      >
        <div class="flex gap-3">
          <div
            :class="[
              'w-6 h-6 flex justify-center items-center rounded cursor-pointer',
              focus ? 'bg-lightPrimary' : 'bg-gray-300'
            ]"
            @mousedown="onMouseDownHandler"
            @mouseup="onMouseUpHandler('decrement')"
          >
            <FontAwesomeIcon :icon="faMinus"
              :class="[
                'text-gray-500 text-sm',
                focus ? 'text-primary' : 'text-danger'
              ]"/>
          </div>

          <div
            :class="[
              'w-6 h-6 flex justify-center items-center rounded cursor-pointer',
              focus ? 'bg-lightPrimary' : 'bg-gray-300'
            ]"
            @mousedown="onMouseDownHandler"
            @mouseup="onMouseUpHandler('increment')"
          >
            <FontAwesomeIcon :icon="faPlus"
              :class="[
                'text-gray-500 text-sm',
                focus ? 'text-primary' : 'text-danger'
              ]"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Validations -->
    <div v-if="props.validations" class="text-sm font-base text-danger mt-1 ml-1">
      {{ invalid }}
    </div>

  </div>
</template>