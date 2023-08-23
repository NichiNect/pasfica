<script setup>
import moment from 'moment';
moment.locale('id');

/**
 * * Variables
 */
const props = defineProps([
  'placeholder', 'inputValue', 'name', 'label', 'icon', 'iconPosition', 'disabled', 'useFormat', 'mode'
]);
const emit = defineEmits(['onFocus', 'onBlur', 'onChange']);

const focus = ref(false);
const inputValue = ref([]);
const formatDate = ref(null);
const dateRef = ref({
  start: moment(new Date()).subtract(3, 'day').format(),
  end: moment(new Date()).format(),
});

/**
 * * Methods
 */
const changeDate = (e) => {
  inputValue.value = [
    moment(dateRef.value.start).format(formatDate.value),
    moment(dateRef.value.end).format(formatDate.value)
  ];

  emit('onChange', input.value);
}

const onFocusHandler = () => {

  setTimeout(() => {
    focus.value = true;
    emit('onFocus');
  }, 150);
}

const onBlurHandler = () => {

  setTimeout(() => {
    // focus.value = false;
    // emit('onBlur');
  }, 200)
}

/**
 * * Hooks & Watcher
 */
onMounted(() => {

  if (props.useFormat) {
    formatDate.value = props.useFormat;
  } else {
    formatDate.value = "DD-MM-YYYY";
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
        type="text"
        :value="
          (inputValue && inputValue.length > 0)
          ? `${moment(inputValue[0], formatDate, true).format(formatDate)} - ${moment(inputValue[1], formatDate, true).format(formatDate)}`
          : ''
        "
        :placeholder="props.placeholder"
        :class="[
          (props.iconPosition == 'right') ? 'pl-5 pr-14' : (props.icon) ? 'pl-16 pr-5' : 'pl-5 pr-5',
          focus ? 'bg-primary' : ''
        ]"
        :name="props.name"
        :id="props.name"
        :disabled="props.disabled ? true: false"
        autocomplete="off"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
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

      <div
        v-if="!props.disabled && focus"
        class="text-center"
      >
        <div class="fixed top-0 left-0 z-20 w-full h-full bg-black opacity-30"
          @click="() => {
            focus = false;
          }"
        ></div>
        
        <div :class="[
          'absolute z-30 w-full p-5 bg-white border-2 rounded-lg shadow-lg',
          'right-0 translate-x-1/2'
        ]">

          <ClientOnly>
            <VDatePicker
              :attributes="[{
                highlight: 'blue',
                dates: [
                  inputValue[0]
                    ? moment(inputValue[0], formatDate, true).format() 
                    : new Date(),
                  inputValue[1]
                    ? moment(inputValue[1], formatDate, true).format() 
                    : new Date(),
                ]
              }]"
              class="w-full"
              expanded
              :mode="props.mode"
              v-model.range="dateRef"
              :is24hr="true"
              @update:modelValue="changeDate"
            />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>