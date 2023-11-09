<script setup>
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'options', 'icon', 'iconPosition', 'disabled', 'loading', 'searchable', 'size', 'serverSideControl',
  'validations', 'errors'
]);
const emit = defineEmits(['onFocus', 'onChange']);
const inputValue = ref({});
const inputShownValue = ref("");
const options = ref([]);
const isLoading = ref(false);
const focus = ref(false);
const invalid = ref(null);
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
const filterOption = async (e) => {

  if (options.value && options.value.length > 0) {

    let filtered = [];

    if (props.searchable || props.searchable != null) {

      // * is fetch server
      if (props.serverSideControl || props.serverSideControl?.apiUrl) {

        if (e.target.value) {

          let debounceTimer;
          clearTimeout(debounceTimer);

          debounceTimer = setTimeout( async () => {

            const resultData = await serverSideFetchOptions(e.target.value.toLowerCase());
            filteredOptions.value = resultData;
          }, 1000);
        } else {

          filtered = options.value;
        }
        
      } else {

        if (e.target.value) {
  
          filtered = options.value
            .filter((item) => {
              return item.label.toLowerCase()
                .indexOf(e.target.value.toLowerCase()) > -1;
            });
        } else {
  
          filtered = options.value.slice(0, 10);
        }
      }

    } else {

      filtered = options.value;
    }

    activeOption.value = -1;
    filteredOptions.value = filtered;
    showOption.value = true;
  }
}

const serverSideFetchOptions = async (querySearch = null) => {

  isLoading.value = true;
  try {

    const result = await useFetch(props.serverSideControl?.apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      onResponse({ request, response }) {
        // console.log('res', response);
      },
      method: 'GET',
      params: {
        [props.serverSideControl?.searchQueryKey]: querySearch
      },
      watch: false
    })

    options.value = result.data.value;

    return result.data.value;
  } catch(err) {
  } finally {
    isLoading.value = false;
  }
}

const onFocusHandler = async (e) => {

  focus.value = true;
  showOption.value = true;
  emit('onFocus', e);

  await serverSideFetchOptions();
    
  if (options.value.length > 0) {
    filterOption(e);
  }
  if (props.searchable) {
    e.target.select();
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
onBeforeMount( async () => {

  if (props.serverSideControl || props.serverSideControl?.apiUrl) {

    // isLoading.value = true;
    // try {

    //   console.log('ontrycatch');

    //   const result = await useLazyAsyncData('optionsData', () => useFetch(props.serverSideControl?.apiUrl, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     onResponse({ request, response }) {
    //       // console.log('res', response);
    //     },
    //     method: 'GET'
    //   }));

    //   console.log('apifetch', result.data.value.data);

    //   options.value = result.data.value.data;
    // } catch(err) {
    // } finally {
    //   isLoading.value = false;
    // }
    if (props.inputValue) {
      await serverSideFetchOptions();
    }

  } else {

    if (props.options) {
      options.value = props.options;
    }
  }

  if (props.inputValue) {

    const selected = options.value?.find((one) => {
      return one.value == props.inputValue;
    });

    inputValue.value = selected?.value;
    inputShownValue.value = selected?.label;
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

  emit('onChange', reactive({
    label: inputShownValue.value,
    value: inputValue.value
  }));
});
</script>

<template>
  <div :class="[
    'form_control',
    props.disabled ? 'opacity-70' : ''
  ]">
    <label v-if="props.label" :for="`${[props.name]}_select`" 
      :class="[
        'select-none',
        (focus && !invalid) ? 'text-primary' : '',
        invalid ? 'text-danger' : ''
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
            : inputPadding['right'][props.size || 'md'],
          invalid ? 'invalid' : ''
        ]"
        :disabled="props.disabled"
        autocomplete="off"
        :readonly="props.searchable ? false : true"
        :placeholder="props.placeholder"
        :id="`${props.name}_select`"
        :value="inputShownValue"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
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
          focus = (!props.disabled ? !focus : false);
        }"
      >
        <FontAwesomeIcon 
          :class="[
            'text-xl -mt-2',
            (props.iconPosition == 'right') ? 'mr-8' : '',
            (focus && !invalid) ? 'text-primary' : '',
            invalid ? 'text-danger' : ''
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
          'scroll_control',
          inputOptionContainer[props.size || 'md'],
          focus ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
          'absolute left-0 mt-2 w-full bg-slate-50 shadow text-left z-30 overflow-hidden ease-in-out max-h-[200px] overflow-y-auto'
        ]
      ">
        <li 
          v-if="isLoading"
          :class="[
            'bg-lightPrimary text-primary px-2'
          ]"
        >
          <BaseLoading class="py-2 text-xs" />
        </li>
        <li 
          v-else
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

    <!-- Validations -->
    <div v-if="props.validations || props.errors" class="text-sm font-base text-danger mt-1 ml-1">
      {{ invalid }}
    </div>

  </div>
</template>