<script setup>
import Multiselect from 'vue-multiselect';

/**
 * * Variables
 */
const props = defineProps([
  'options', 'placeholder', 'inputValue', 'name', 'label', 'searchable', 'disabled', 'multiple',
  'serverSideControl', 'validations', 'errors'
]);
const emit = defineEmits(['onFocus', 'onBlur', 'onChange', 'onRemove']);

const invalid = ref(null);
const focus = ref(false);
const isLoading = ref(false);
const inputValue = ref();
const options = ref(props.options || []);
const debounceTimer = ref();


/**
 * * Methods
 */
const debounce = (method, timer) => {
  if (debounceTimer.value !== null) {
    clearTimeout(debounceTimer.value);
  }
  debounceTimer.value = setTimeout(() => {
    method();
  }, timer);
}

const serverSideFetchOptions = async (query = null) => {

  isLoading.value = true;
  try {

    const result = await useFetch(props.serverSideControl?.apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        [props.serverSideControl?.searchQueryKey]: query
      },
      watch: false,
      onResponse({ request, response }) {
        // console.log()
      }
    });

    options.value = result.data.value;

    return result.data.value;
  } catch (err) {
  } finally {
    isLoading.value = false;
  }
}

const searchHandler = async (query) => {

  if (props.serverSideControl && props.serverSideControl?.apiUrl) {

    // let debounceTimer;
    // clearTimeout(debounceTimer);
    
    // debounceTimer = setTimeout( async () => {
    //   const resultData = await serverSideFetchOptions(query);
    //   options.value = resultData;        
    // }, 1000);

    debounce( async () => {
      const resultData = await serverSideFetchOptions(query);
      options.value = resultData;
    }, 1000);
  }
}


/**
 * * Hooks & Watchers
 */
onMounted(() => {
  
  inputValue.value = props.inputValue;

  if (props.errors && props.errors?.length > 0) {
    invalid.value = props.errors[0].message;
  }
});

watch(inputValue, () => {
  // console.log('val', inputValue.value);
  emit('onChange', inputValue.value);

  if (props.validations) {

    const validator = useValidator(props.validations, inputValue.value);

    if (validator.length > 0) {
      invalid.value = validator[0];
    } else {
      invalid.value = null;
    }
  }
});

await serverSideFetchOptions();
</script>

<template>
  <div 
    :class="[
      'form_control',
      props.disabled ? 'opacity-70' : ''
    ]"
  >
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
      <Multiselect 
        v-model="inputValue" 
        :placeholder="props.placeholder"
        :name="props.name"
        :options="options"
        :searchable="props.searchable"
        :clearOnSelect="false"
        :internalSearch="props.serverSideControl ? false : true"
        :loading="isLoading"
        :disabled="props.disabled"
        :class="[
          (focus && !invalid) ? 'input_active': '',
          invalid ? 'input_error' : ''
        ]"

        :showLabels="false"
        label="label"
        trackBy="value"
        :multiple="props.multiple"
        @searchChange="searchHandler"
        @open="() => {
          focus = true;
          emit('onFocus');
        }"
        @close="() => {
          focus = false;
          emit('onBlur');
        }"
      >
      </Multiselect>
    </div>

    <!-- Validations -->
    <div v-if="props.validations || props.errors" class="text-sm font-base text-danger mt-1 ml-1">
      {{ invalid }}
    </div>
  </div>
</template>

<style>
  .input_active > .multiselect__tags {
    @apply border-primary;
  }
  .input_error > .multiselect__tags {
    @apply border-danger;
  }

  /**
    * Multiselect
   */
  fieldset[disabled] .multiselect {
    pointer-events: none;
  }

  .multiselect__spinner {
    position: absolute;
    right: 6px;
    top: 1px;
    width: 40px;
    height: 38px;
    background: #fff;
    display: block;
  }

  .multiselect__spinner::before,
  .multiselect__spinner::after {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    margin: -8px 0 0 -8px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    border-color: #3b82f6 transparent transparent;
    border-style: solid;
    border-width: 2px;
    box-shadow: 0 0 0 1px transparent;
  }

  .multiselect__spinner::before {
    animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
    animation-iteration-count: infinite;
  }

  .multiselect__spinner::after {
    animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
    animation-iteration-count: infinite;
  }

  .multiselect__loading-enter-active,
  .multiselect__loading-leave-active {
    transition: opacity 0.4s ease-in-out;
    opacity: 1;
  }

  .multiselect__loading-enter,
  .multiselect__loading-leave-active {
    opacity: 0;
  }

  .multiselect,
  .multiselect__input,
  .multiselect__single {
    /* font-family: inherit; */
    /* font-size: 16px; */
    touch-action: manipulation;
    @apply text-lg;
  }

  .multiselect {
    box-sizing: content-box;
    display: block;
    position: relative;
    width: 100%;
    min-height: 40px;
    text-align: left;
    color: #35495e;
  }

  .multiselect * {
    box-sizing: border-box;
  }

  .multiselect:focus {
    outline: none;
  }

  .multiselect--disabled {
    /* background: #ededed; */
    pointer-events: none;
    opacity: 0.6;
    @apply opacity-70;
  }

  .multiselect--active {
    z-index: 50;
  }

  .multiselect--active:not(.multiselect--above) .multiselect__current,
  .multiselect--active:not(.multiselect--above) .multiselect__input,
  .multiselect--active:not(.multiselect--above) .multiselect__tags {
    /* border-bottom-left-radius: 0;
    border-bottom-right-radius: 0; */
    @apply rounded-xl;
  }

  .multiselect--active .multiselect__select {
    transform: rotateZ(180deg);
  }

  .multiselect--above.multiselect--active .multiselect__current,
  .multiselect--above.multiselect--active .multiselect__input,
  .multiselect--above.multiselect--active .multiselect__tags {
    /* border-top-left-radius: 0;
    border-top-right-radius: 0; */
    @apply rounded-xl;
  }

  .multiselect__input,
  .multiselect__single {
    position: relative;
    display: inline-block;
    min-height: 20px;
    line-height: 20px;
    border: none;
    border-radius: 5px;
    padding: 0 0 0 5px;
    width: calc(100%);
    transition: border 0.1s ease;
    box-sizing: border-box;
    margin-bottom: 8px;
    vertical-align: top;
  }

  .multiselect__input::placeholder {
    /* color: #35495e; */
    @apply text-gray-400;
  }

  .multiselect__tag ~ .multiselect__input,
  .multiselect__tag ~ .multiselect__single {
    width: auto;
  }

  .multiselect__input:hover,
  .multiselect__single:hover {
    border-color: #cfcfcf;
  }

  .multiselect__input:focus,
  .multiselect__single:focus {
    border-color: #a8a8a8;
    outline: none;
  }

  .multiselect__single {
    padding-left: 5px;
    /* margin-bottom: 8px; */
    @apply my-2.5;
  }

  .multiselect__tags-wrap {
    /* display: inline; */
    @apply flex flex-row gap-1;
  }

  .multiselect__tags {
    /* min-height: 40px;
    display: block;
    padding: 8px 40px 0 8px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-size: 14px; */
    @apply border border-gray-300 rounded-xl placeholder:font-light placeholder:text-base px-5;
  }

  .multiselect__tag {
    /* position: relative; */
    /* display: inline-block; */
    /* padding: 4px 26px 4px 10px; */
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    /* background: #41b883; */
    /* margin-bottom: 5px; */
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    @apply relative inline-block bg-lightPrimary my-2 px-4 py-1;
  }

  .multiselect__tag-icon {
    cursor: pointer;
    position: absolute;
    right: -4px;
    top: 0;
    bottom: 0;
    font-weight: 700;
    font-style: initial;
    width: 22px;
    text-align: center;
    line-height: 22px;
    transition: all 0.2s ease;
    border-radius: 5px;
  }

  .multiselect__tag-icon::after {
    content: "×";
    /* color: #266d4d; */
    /* font-size: 14px; */
    @apply text-primary text-xs;
  }

  /* // Remove these lines to avoid green closing button
  //.multiselect__tag-icon:focus,
  //.multiselect__tag-icon:hover {
  //  background: #369a6e;
  //} */

  .multiselect__tag-icon:focus::after,
  .multiselect__tag-icon:hover::after {
    color: white;
  }

  .multiselect__current {
    line-height: 16px;
    min-height: 40px;
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    padding: 8px 12px 0;
    padding-right: 30px;
    white-space: nowrap;
    margin: 0;
    text-decoration: none;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    cursor: pointer;
  }

  .multiselect__select {
    line-height: 16px;
    display: block;
    position: absolute;
    box-sizing: border-box;
    width: 40px;
    height: 38px;
    right: 1px;
    top: 1px;
    padding: 4px 8px;
    margin: 0;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .multiselect__select::before {
    position: relative;
    right: 0;
    top: 65%;
    color: #999;
    margin-top: 4px;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #999 transparent transparent transparent;
    content: "";
  }

  .multiselect__placeholder {
    /* color: #adadad; */
    display: inline-block;
    /* margin-bottom: 10px; */
    /* padding-top: 2px; */
    @apply my-2 text-gray-400;
  }

  .multiselect--active .multiselect__placeholder {
    display: none;
  }

  .multiselect__content-wrapper {
    position: absolute;
    display: block;
    width: 100%;
    max-height: 240px;
    overflow: auto;
    /* border: 1px solid #e8e8e8; */
    /* border-top: none; */
    /* border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px; */
    z-index: 50;
    /* -webkit-overflow-scrolling: touch; */
    @apply bg-slate-50 border border-lightPrimary shadow-xl rounded-xl mt-2;
  }

  .multiselect__content-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .multiselect__content-wrapper::-webkit-scrollbar-track {
    border-radius: 10px;

  }

  .multiselect__content-wrapper::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .2);
    border-radius: 10px;
    cursor: pointer;
  }

  .multiselect__content-wrapper::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, .4);
  }

  .multiselect__content {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
    min-width: 100%;
    vertical-align: top;
  }

  .multiselect--above .multiselect__content-wrapper {
    bottom: 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: none;
    border-top: 1px solid #e8e8e8;
  }

  .multiselect__content::-webkit-scrollbar {
    display: none;
  }

  .multiselect__element {
    display: block;
  }

  .multiselect__option {
    display: block;
    padding: 12px;
    min-height: 40px;
    line-height: 16px;
    text-decoration: none;
    text-transform: none;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
  }

  .multiselect__option::after {
    top: 0;
    right: 0;
    position: absolute;
    line-height: 40px;
    padding-right: 12px;
    padding-left: 20px;
    font-size: 13px;
  }

  .multiselect__option--highlight {
    /* background: #41b883;
    outline: none;
    color: white; */
    @apply bg-lightPrimary text-gray-400 outline-0;
  }

  .multiselect__option--highlight::after {
    content: attr(data-select);
    background: #41b883;
    color: white;
  }

  .multiselect__option--selected {
    /* background: #f3f3f3;
    color: #35495e; */
    /* font-weight: bold; */
    @apply bg-slate-50 font-bold;
  }

  .multiselect__option--selected::after {
    content: attr(data-selected);
    color: silver;
    background: inherit;
  }

  .multiselect__option--selected.multiselect__option--highlight {
    background: #ff6a6a;
    color: #fff;
  }

  .multiselect__option--selected.multiselect__option--highlight::after {
    background: #ff6a6a;
    content: attr(data-deselect);
    color: #fff;
  }

  .multiselect--disabled .multiselect__current,
  .multiselect--disabled .multiselect__select {
    background: #ededed;
    color: #a6a6a6;
    @apply opacity-70 rounded-r-xl;
  }

  .multiselect__option--disabled {
    background: #ededed !important;
    color: #a6a6a6 !important;
    cursor: text;
    pointer-events: none;
  }

  .multiselect__option--group {
    background: #ededed;
    color: #35495e;
  }

  .multiselect__option--group.multiselect__option--highlight {
    background: #35495e;
    color: #fff;
  }

  .multiselect__option--group.multiselect__option--highlight::after {
    background: #35495e;
  }

  .multiselect__option--disabled.multiselect__option--highlight {
    background: #dedede;
  }

  .multiselect__option--group-selected.multiselect__option--highlight {
    background: #ff6a6a;
    color: #fff;
  }

  .multiselect__option--group-selected.multiselect__option--highlight::after {
    background: #ff6a6a;
    content: attr(data-deselect);
    color: #fff;
  }

  .multiselect-enter-active,
  .multiselect-leave-active {
    transition: all 0.15s ease;
  }

  .multiselect-enter,
  .multiselect-leave-active {
    opacity: 0;
  }

  .multiselect__strong {
    margin-bottom: 8px;
    line-height: 20px;
    display: inline-block;
    vertical-align: top;
  }

  *[dir="rtl"] .multiselect {
    text-align: right;
  }

  *[dir="rtl"] .multiselect__select {
    right: auto;
    left: 1px;
  }

  *[dir="rtl"] .multiselect__tags {
    padding: 8px 8px 0 40px;
  }

  *[dir="rtl"] .multiselect__content {
    text-align: right;
  }

  *[dir="rtl"] .multiselect__option::after {
    right: auto;
    left: 0;
  }

  *[dir="rtl"] .multiselect__clear {
    right: auto;
    left: 12px;
  }

  *[dir="rtl"] .multiselect__spinner {
    right: auto;
    left: 1px;
  }

  @keyframes spinning {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(2turn);
    }
  }
</style>