<script setup>
import { faCheck } from '@fortawesome/free-solid-svg-icons';


const props = defineProps([
  'inputValue', 'name', 'label', 'color', 'checked', 'disabled', 'size'
]);
const emit = defineEmits(['onChange']);

const inputValue = ref(null);
const checked = ref(false);

const checkboxSize = {
  lg: '',
  md: 'text-md',
  sm: 'text-sm',
  xs: 'text-xs'
}

const checkHandler = () => {
  checked.value = !checked.value;

  if (checked.value == true) {
    inputValue.value = props.inputValue;
  } else {
    inputValue.value = null;
  }

  emit('onChange', inputValue.value);
}

onBeforeMount(() => {
  if (props.checked) {
    checked.value = true;
  }

  if (!props.inputValue) {
    inputValue.value = true;
  }
});

</script>

<template>
  <input 
    type="radio"
    class="hidden"
    v-model="inputValue"
    :id="`${props.name}_radio`"
    :name="props.name"
    :value="props.inputValue"
    :checked="checked ? true : false"
  />

  <label 
    :for="`${props.name}_radio`"
    :class="[
      'flex gap-2 items-center cursor-pointer',
      props.disabled ? 'pointer-events-none opacity-60' : ''
    ]"
    @mousedown="checkHandler"
  >
    <div
      :class="[
        'flex justify-center items-center rounded-full w-6 h-6 active:outline',
        checked 
          ? `border-[5px] border-light${props.color?.charAt(0)?.toUpperCase() + props.color?.slice(1) || 'Primary'} border-${props.color?.toLowerCase() || 'Primary'} text-gray-500 font-semibold` 
          : `border-2 border-background text-gray-500`
      ]"
    >
      <FontAwesomeIcon v-if="checked" :icon="faCheck" class="text-lg" />
    </div>

    <div :class="[
      'whitespace-nowrap',
      checked ? 'font-semibold' : '',
      props.size ? `${checkboxSize[props.size || 'md']}` : ''
    ]">
      {{ props.label }}
    </div>
  </label>
</template>