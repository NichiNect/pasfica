<script setup>
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'options', 'icon', 'iconPosition', 'disabled', 'loading', 'searchable', 'size'
]);
const emit = defineEmits(['onFocus', 'onChange']);
const inputValue = ref({});
const inputShownValue = ref("");
const options = ref([]);
const isLoading = ref(false);
const focus = ref(false);
const keyDown = ref(false);
const activeOption = ref(0);
const filteredOptions = ref([]);
const showOption = ref(false);

const inputField = {
  sm: 'px-3 pt-[0.40rem] pb-[0.32rem] text-sm rounded-lg',
  md: 'px-3 py-[0.54rem] text-base rounded-lg',
  lg: 'px-5 py-[0.64rem] text-lg rounded-lg',
};

const inputPadding = {
  left: {
    sm: 'pl-9',
    md: 'pl-16',
    // lg: 'pl-[3.5rem]',
  },
  right: {
    sm: 'pr-14',
    md: 'pr-20',
    // lg: 'pr-[3.5rem]',
  },
};

const inputOptionContainer = {
  sm: 'rounded-md py-1',
  md: 'rounded-lg py-2',
  lg: 'rounded-xl py-3',
};

const inputOption = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-lg',
};

/**
 * * Methods
 */
const filterOption = (e) => {

  if (options.value && options.value.length > 0) {

    let filtered = [];

    if (props.searchable || props.searchable != null) {

      if (e.target.value) {

        filtered = options.value
          .filter((item) => {
            return item.label.toLowerCase()
              .indexOf(e.target.value.toLowerCase()) > -1;
          });
      } else {

        filtered = options.value.slice(0, 10);
      }
    } else {

      filtered = options.value;
    }

    activeOption.value = -1;
    filteredOptions.value = filtered;
    showOption.value = true;
  }
}

const onBlurHandler = (e) => {
  focus.value = false;
}

const onKeyUpHandler = (e) => {

  if (props.searchable) {
    inputShownValue.value = e.target.value;
  }

  if (options.value.length > 0) {

    if (e.keyCode === 13) { // `enter` keyboard

      let resultValue = filteredOptions.value[activeOption.value];
      activeOption.value = -1;
      filteredOptions.value = [];
      showOption.value = false;

      inputShownValue.value = resultValue?.label || inputShownValue.value;
      inputValue.value = resultValue?.value || inputValue.value;
    } else if (e.keyCode == 38 ) { // `up arrow` keyboard

      if (activeOption.value == 0) 
        return;

      activeOption.value -= 1;
    } else if (e.keyCode === 40) { // `down arrow` keyboard

      if ((activeOption.value + 1) >= filteredOptions.value.length)
        return;

      activeOption.value += 1;
    } else {

      if (filteredOptions.value.length > 0) {

        filterOption(e);
        inputShownValue.value = e.target.value
      }
    }
  }
}

const optionMouseUpHandler = (optionItem, idx) => {
  keyDown.value = false;
  activeOption.value = idx;
  filteredOptions.value = [];
  showOption.value = false;

  inputShownValue.value = optionItem.label;
  inputValue.value = optionItem.value;
  // emit('onChange', item);
}

/**
 * * Hooks & Watcher
 */
onBeforeMount(() => {

  if (props.options) {
    options.value = props.options;
  }
});

watch(inputValue, () => {
  emit('onChange', reactive({
    label: inputShownValue.value,
    value: inputValue.value
  }));
});
</script>

<template>
  <div class="form_control">
    <label v-if="props.label" :for="`${[props.name]}_select`" 
      :class="[
        'select-none',
        focus ? 'text-primary' : ''
      ]">
      {{ props.label }}
    </label>

    <input 
      type="hidden"
      :value="inputValue"
      :name="`${props.name}_select`"
    />

    <div class="relative overflow-hidden">
      <input 
        type="text"
        :class="[
          inputField[props.size || 'md'],
          props.iconPosition 
            ? inputPadding[props.iconPosition][props.size || 'md'] 
            : inputPadding['right'][props.size || 'md']
        ]"
        autocomplete="off"
        :readonly="props.searchable ? false : true"
        :placeholder="props.placeholder"
        :id="`${props.name}_select`"
        :value="inputShownValue"
        @focus="(e) => {
          focus = true;
          showOption = true;
          emit('onFocus', e);

          if (options.length > 0) {
            filterOption(e);
          }
          if (props.searchable) {
            e.target.select();
          }
        }"
        @blur="onBlurHandler(e)"
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

      <label 
        class="absolute mr-5 right-1 text-gray-400 top-1/2 -translate-y-1/2"
        @click="() => {
          focus = (!props.disabled ? !focus : flase);
        }"
      >
        <FontAwesomeIcon 
          :class="[
            'text-xl -mt-2',
            (props.iconPosition == 'right') ? 'mr-8' : '',
            focus ? 'text-primary' : '',
          ]"
          :icon="faChevronDown"
          @click="() => {
            focus = true;
          }"
        />
      </label>
    </div>

    <div v-if="showOption">
      <ul
        :class="[
          'scroll-control',
          inputOptionContainer[props.size || 'md'],
          focus ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
          'absolute left-0 mt-2 w-full bg-slate-50 shadow text-left z-30 overflow-hidden ease-in-out max-h-[200px] overflow-y-auto'
        ]
      ">
        <li 
          v-for="(item, idx) in filteredOptions"
          :class="[
            'cursor-pointer hover:bg-lightPrimary',
            inputOption[props.size || 'md'],
            (idx == activeOption) ? 'bg-lightPrimary text-primary' : ''
          ]"
          @mousedown="() => {

            keyDown = true;

            focus = true;

            keyDown = false;
            activeOption = idx;
            filteredOptions = [];
            showOption = false;

            inputShownValue = item.label;
            inputValue = item.value;

            focus = false;
            keyDown = false;
          }"
        >
        {{ item.label }}
        </li>
      </ul>

    </div>
  </div>
</template>