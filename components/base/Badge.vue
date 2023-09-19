<script setup>

/**
 * * Variables
 */
const props = defineProps([
  'variant', 'color', 'class', 'size', 'rounded'
]);

const buttonVariant = {
  solid: {
    primary: 'bg-primary text-white',
    lightPrimary: 'bg-lightPrimary text-primary',
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
}
const buttonSize = {
  lg: 'px-5 py-2 text- flex items-center justify-center gap-2',
  md: 'px-4 py-1.5 text-sm flex items-center justify-center gap-2',
  sm: 'px-4 pt-1 pb-1.5 text-xs flex items-center justify-center gap-2',
  xs: 'px-2 pt-0.5 pb-1 text-xs flex items-center justify-center gap-1.5',
}

</script>

<template>
  <div
    :class="[
      buttonVariant[props.variant ?? 'solid'][props.color ?? 'primary'],
      buttonSize[props.size ?? 'md'],
      props.rounded ? props.rounded : 'rounded',
      props.class ?? ''
    ]"
  >
    <slot />
  </div>
</template>