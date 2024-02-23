<script setup>
/**
 * * Variables
 */
const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'icon', 'iconPosition', 'disabled', 'minValue', 'maxLength', 'validations', 'errors'
]);
const emit = defineEmits(['onFocus', 'onBlur', 'onChange']);

const focus = ref(false);
const inputValue = ref('');
const invalid = ref(null);

/**
 * * Methods
 */
const onKeyUpHandler = (e) => {

  if (e.target.value.length < (props.maxLength || 18)) {

    inputValue.value = formatRupiah(e.target.value);
  }
}

const formatRupiah = (val) => {

  if (props.minValue && parseInt(val) < props.minValue) {
    val = min.toString();
  }

  let negative = false;

  if (val.at(0) == '-') {
    val.substring(1);
    negative = true;
  }
  let numberString = val.replace(/[^,\d]/g, '').toString();
  let splited = numberString.split(',');
  let modulus = splited[0].length % 3;
  let resultVal = splited[0].substr(0, modulus);
  let group = splited[0].substr(modulus).match(/\d{3}/g);

  if (group) {
    let separator = modulus ? '.' : '';
    resultVal += separator + group.join('.');
  }

  resultVal = splited[1] != undefined ? resultVal + ',' + splited[1] : resultVal;

  return (negative ? '-' : '') + resultVal;
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

watch(inputValue, (current, before) => {

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
          (props.iconPosition == 'right') ? 'pl-14 pr-14' : (props.icon) ? 'pl-24 pr-5' : 'pl-14 pr-5',
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
        @keyup="onKeyUpHandler"
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

      <div :class="[
        'absolute top-1/2 -translate-y-1/2 text-lg',
        (props.iconPosition == 'right') ? 'left-1 ml-5' : (props.icon) ? 'ml-16' : 'ml-5'
      ]">
        Rp.
      </div>
    </div>

    <!-- Validations -->
    <div v-if="props.validations || props.errors" class="text-sm font-base text-danger mt-1 ml-1">
      {{ invalid }}
    </div>
  </div>
</template>
