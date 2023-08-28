<script setup>
/**
 * * Variables
 */
const props = defineProps([
  'type', 'variant', 'color', 'class', 'label', 'size', 'disabled', 'rounded'
]);
const emit = defineEmits(["onClick"]);
const btn = ref(null);

const buttonVariant = {
  solid: {
    primary: 'bg-primary text-white',
    lightPrimary: 'bg-lightPrimary text-white',
    secondary: 'bg-secondary text-white',
    danger: 'bg-danger text-white',
    success: 'bg-success text-white',
  },
  outline: {
    primary: 'border-2 border-primary text-primary',
    lightPrimary: 'border-2 border-lightPrimary text-lightPrimary',
    secondary: 'border-2 border-secondary text-secondary',
    danger: 'border-2 border-danger text-danger',
    success: 'border-2 border-success text-success',
  },
  light: {
    primary: 'bg-light-primary text-primary',
    secondary: 'bg-light-secondary text-secondary',
    danger: 'bg-light-danger text-danger',
    success: 'bg-light-success text-success',
  },
}
const buttonSize = {
  lg: 'px-10 py-3 flex items-center gap-3',
  md: 'px-8 py-2 flex items-center gap-2',
  sm: 'px-8 pt-2 pb-2.5 text-xs flex items-center gap-2',
  xs: 'px-6 pt-1 pb-1.5 text-xs flex items-center gap-1.5',
}

/**
 * * Methods
 */
const clickHandler = () => {
  emit('onClick');
}
</script>

<template>
  <button
    :ref="btn" 
    :type="props.type ?? 'button'"
    :class="[
      'btn',
      buttonVariant[props.variant ?? 'solid'][props.color ?? 'primary'],
      buttonSize[props.size ?? 'md'],
      props.rounded ? `rounded-${props.rounded}` : 'rounded-lg',
      props.class ?? '',
    ]"
    :disabled="props.disabled ? true : false"
    @click="clickHandler"
  >
    <span v-if="props.label">{{ props.label }}</span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>

<style scoped>
.btn {
  @apply whitespace-nowrap;
	transform: scale(1);
	filter: brightness(0.95);
}

.btn:disabled {
	@apply bg-lightDisable text-disable;
	cursor: default;
	pointer-events: none;
}

.btn:hover {
	transform: scale(1.02);
	filter: brightness(1);
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .15);
}

.btn:active {
	transform: scale(1);
	filter: brightness(0.9);
	box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .25);
}
</style>