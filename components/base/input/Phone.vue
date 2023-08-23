<script setup>
/**
 * * Variables
 */
const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'icon', 'iconPosition', 'disabled', 'useFormat'
]);
const emit = defineEmits(['onFocus', 'onBlur']);

const focus = ref(false);
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
        focus ? 'text-primary' : ''
      ]"
    >
      {{ props.label }}
    </label>
    
    <div class="relative">
      <input 
        :inputmode="'numeric'"
        type="text"
        :value="inputValue"
        :placeholder="props.placeholder"
        :class="[
          (props.iconPosition == 'right') ? 'pl-5 pr-14' : (props.icon) ? 'pl-16 pr-5' : 'pl-5 pr-5'
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
          focus ? 'text-primary' : ''
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
  </div>
</template>