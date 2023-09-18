<script setup>
/**
 * * Variables
 */
const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'icon', 'iconPosition', 'disabled', 'useFormat', 'validations'
]);
const emit = defineEmits(['onFocus', 'onBlur', 'onChange']);

const focus = ref(false);
const invalid = ref(null);
const inputValue = ref('');

/**
 * * Hooks & Watcher
 */
onBeforeMount(() => {
  if (props.inputValue) {
    inputValue.value = props.inputValue;
  }

  if (!props.useFormat) {
    props.useFormat = '62';
  } else {
    
    const useFormatType = ['62', '0'];
    if (!useFormatType.includes(props.useFormat)) {

      props.useFormat = '62';
    }
  }
});

watch(inputValue, () => {

  if (inputValue.value && typeof inputValue.value == 'string') {

    let val = inputValue.value.split('');
    let resultVal = '';

    val.map((dataItem, idx) => {

      switch (props.useFormat) {
        case '62': {

          const spaceCharIndex = [2, 6, 11, 16];

          for (const itemSpace of spaceCharIndex) {

            if (idx == itemSpace) {
              resultVal += ' ';
            }
          }
        } break;
        case '0' : {

          const spaceCharIndex = [4, 9, 14];

          for (const itemSpace of spaceCharIndex) {

            if (idx == itemSpace) {
              resultVal += ' ';
            }
          }
        } break;
      }

      if (/[0-9]/.test(dataItem)) {
        resultVal += dataItem;
      }
    });

    inputValue.value = resultVal;
  }

  if (props.validations) {

    const validator = useValidator(props.validations, inputValue.value.replace(/\s/g, ''));

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
        invalid ? 'text-danger' : ''
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
          (props.iconPosition == 'right') ? 'pl-5 pr-14' 
            : (props.icon) ? 'pl-16 pr-5' : 'pl-5 pr-5',
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
          invalid ? 'text-danger' : 'text-gray-400'
        ]"
      />

      <!-- <div 
       v-if="focus && props.useFormat == '62'"
       :class="[
        'absolute text-lg top-1/2 -translate-y-1/2',
        props.iconPosition == 'left' ? 'left-2 ml-16' : 'left-1 ml-5'
       ]"
      >
        <FontAwesomeIcon :icon="faPlus" />
      </div> -->
    </div>

    <!-- Validations -->
    <div v-if="props.validations" class="text-sm font-base text-danger mt-1 ml-1">
      {{ invalid }}
    </div>

  </div>
</template>