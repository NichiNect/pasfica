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

/**
 * * Methods
 */
const checkHandler = () => {
  checked.value = !checked.value;

  if (checked.value == true) {
    inputValue.value = props.inputValue;
  } else {
    inputValue.value =  null;
  }

  emit('onChange', inputValue.value);
}

/**
 * * Hooks & Watcher
 */
onMounted(() => {
  if (props.checked) {
    checked.value = true;
  }
});
</script>

<template>
  <input 
    type="checkbox"
    class="hidden"
    v-model="inputValue"
    :id="`${props.name}_checkbox`"
    :name="props.name"
    :value="props.inputValue"
    :checked="checked ? true : false"
  />

  <label 
    :for="`${props.name}_checkbox`"
    :class="[
      'flex gap-2 items-center cursor-pointer',
      props.disabled ? 'pointer-events-none opacity-60' : ''
    ]"
    @mousedown="checkHandler"
  >
    <div
      :class="[
        'flex justify-center items-center rounded-md border-2 w-6 h-6',
        checked 
          ? `border-light${props.color?.charAt(0)?.toUpperCase() + props.color?.slice(1) || 'Primary'} bg-${props.color?.toLowerCase() || 'Primary'} text-white` 
          : `border-light${props.color?.charAt(0)?.toUpperCase() + props.color?.slice(1) || 'Primary'} text-gray-500`
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