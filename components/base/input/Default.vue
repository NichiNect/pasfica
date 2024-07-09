<script setup>
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const props = defineProps([
  'type', 'placeholder', 'inputValue', 'name', 'label', 'icon', 'iconPosition', 'disabled', 'suggestionLists', 'validations', 'errors'
]);
const emit = defineEmits(['onFocus', 'onBlur', 'onChange']);
const invalid = ref(null);
const focus = ref(false);
const inputValue = ref("");
const type = ref('text');
const suggestionLists = ref([]);
const filteredSuggestions = ref([]);
const activeSuggestion = ref(0);
const showSuggestion = ref(0);

/**
 * * Methods
 */
const setInputValue = (data) => {
  inputValue.value = data;
  emit('onChange', inputValue);
}

const filterSuggestions = (e) => {

  const eventValue = e.target.value;
  let filtered = [];
  if (eventValue) {

    filtered = props.suggestionLists.filter((item) => {
      return item.toLowerCase().indexOf(eventValue.toLowerCase()) > -1
    }).slice(0, 10);
  } else {
    filtered = props.suggestionLists.slice(0, 10);
  }

  activeSuggestion.value = -1; // cause 0 used by array index 0
  filteredSuggestions.value = filtered;
  showSuggestion.value = true;
}

const suggestionMouseDown = (idxList) => {
  
  activeSuggestion.value = idxList;
  setInputValue(filteredSuggestions.value[idxList] ? filteredSuggestions.value[idxList] : inputValue.value);

  filteredSuggestions.value = [];
  showSuggestion.value = false;
  focus.value = false;
}

const suggestionKeyUp = (e) => {

  if (props.suggestionLists && props.suggestionLists.length > 0) {
    
    if (e.keyCode === 13) { // `enter` keyboard

      let resultValue = filteredSuggestions.value[activeSuggestion.value];
      setInputValue(resultValue ? resultValue : inputValue.value);

      activeSuggestion.value = -1;
      filteredSuggestions.value = [];
      showSuggestion.value = false;

      // e.preventDefault();
    } else if (e.keyCode === 38) { // `up arrow` keyboard

      if (activeSuggestion.value == 0) {
        return
      }

      activeSuggestion.value -= 1;
    } else if (e.keyCode === 40) { // `down arrow` keyboard

      if ((activeSuggestion.value + 1) >= filteredSuggestions.value.length) {
        return;
      }

      activeSuggestion.value += 1;
    } else {
      filterSuggestions(e);
    }
  }
}

/**
 * * Hooks & Watcher
 */
onBeforeMount(() => {
  if (props.inputValue) {
    inputValue.value = props.inputValue;
  }

  if (props.suggestionLists) {
    suggestionLists.value = props.suggestionLists;
  }
});

onMounted(() => {
  if (props.type) {
    type.value = props.type;
  } else {
    type.value = 'text';
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
    props.disabled ? 'opacity-70' : '',
  ]">
    <label :for="props.name" 
      :class="[
        (focus && !invalid) ? 'text-primary' : '',
        invalid ? 'text-danger' : ''
      ]"
    >
      {{ props.label }}
    </label>

    <div class="relative">
      <input 
        :type="type"
        v-model="inputValue"
        :placeholder="props.placeholder"
        :name="props.name"
        :id="props.name"
        :disabled="props.disabled"
        :class="[
          (props.iconPosition == 'right') ? 'pl-5 pr-14' : (props.icon) ? 'pl-16 pr-5' : 'pl-5 pr-5',
          invalid ? 'invalid' : ''
        ]"
        @focus="(e) => {
          focus = true;
          emit('onFocus');

          // * suggestion
          if (props.suggestionLists && props.suggestionLists.length > 0) {
             filterSuggestions(e)
          }
        }"
        @blur="(e) => {
          focus = false;
          emit('onBlur');
        }"
        @keyup="(e) => {
          setInputValue(e.target.value);
          suggestionKeyUp(e);
        }"
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

      <FontAwesomeIcon 
        v-if="props.type == 'password'" 
        :icon="type == 'password' ? faEye : faEyeSlash"   
        :class="[
          'absolute text-xl top-1/2 -translate-y-1/2 right-1 mr-5',
          'hover:cursor-pointer',
          (focus && !invalid) ? 'text-primary' : '',
          invalid ? 'text-danger' : 'text-gray-400'
        ]"
        @click="() => {
          if (type == 'text') {
            type = 'password';
          } else {
            type = 'text';
          }
        }"
      />
    </div>

    <!-- Suggestions -->
    <div v-if="showSuggestion && filteredSuggestions.length > 0">
      <ul :class="[
        'absolute left-0 mt-10 rounded-xl w-full bg-white shadow text-left z-20 overflow-auto ease-in-out text-primary',
        focus ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
      ]">
        <li v-for="(suggestionItem, idx) in filteredSuggestions"
          :class="[
            'w-full px-5 py-3 list-none text-gray-800 cursor-pointer font-medium hover:bg-lightPrimary',
            (idx == activeSuggestion) ? 'bg-lightPrimary text-primary' : ''
          ]"
          @mousedown="suggestionMouseDown(idx)"
        >
          {{ suggestionItem }}
        </li>
      </ul>
    </div>

    <!-- Validations -->
    <div v-if="props.validations || props.errors" class="text-sm font-base text-danger mt-1 ml-1">
      {{ invalid }}
    </div>

  </div>
</template>