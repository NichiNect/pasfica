<script setup>
import { faBusinessTime, faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const searchFocus = ref(false);
const searchValue = ref('');


/**
 * * Methods
 */
const searchBlurHandler = () => {
  setTimeout(() => {
    searchFocus.value = false;
  }, 100);
}

/**
 * * Hooks & Watcher
 */
watch(searchValue, () => {
  console.log('v', searchValue.value);
});
</script>

<template>
  <div class="relative py-2 lg:py-4 bg-background z-20">
    <div class="container flex justify-between px-8 mx-auto">
      <h2 class='text-base text-gray-500 hidden lg:block'>
          Information to 
          <a href='#' target="_blank" rel="noreferrer" class='text-base font-medium text-primary'>
              <FontAwesomeIcon :icon="faBusinessTime" class="ml-2 mr-1" /> Dashboard Vendor
          </a>
      </h2>

      <div class="block lg:hidden">
          <NuxtLink to="/">
              <!-- <a class="block w-24">
                  <img src="/logo.png" width="180" height="60" />
              </a> -->
              <h1 class='text-xl font-bold whitespace-nowrap'>Your Logo</h1>
          </NuxtLink>
      </div>

      <div class="flex">
        <NuxtLink to="#" class="px-4 text-base text-gray-500 hidden lg:block">
          About
        </NuxtLink>
        <NuxtLink to="#" class="px-4 text-base text-gray-500 hidden lg:block">
          Articles
        </NuxtLink>
        <NuxtLink to="#" class="px-4 text-base text-gray-500 hidden lg:block">
          FAQ
        </NuxtLink>
      </div>
    </div>
  </div>

  <div class="bg-white shadow-md sticky top-0 z-20">
    <div class="container flex justify-between items-center relative px-4 py-4 gap-8 mx-auto">
      <NuxtLink to="/" class="hidden lg:block">
        <!-- <a class="w-26 hidden lg-block">
            <img src="/logo.png" width="180" height="60" />
        </a> -->
        <h1 class='text-xl font-bold whitespace-nowrap'>Your Logo</h1>
      </NuxtLink>

      <div class="w-full flex items-center gap-6">
        <div class='w-full block'>
          <!-- Search -->
          <div id="search">
            <form action="#" class="relative" @submit.prevent="() => {}">
              <input 
                type="text" 
                name="search"
                :class="[
                  'w-full bg-background px-6 py-3 rounded-full font-medium placeholder:font-normal focus:shadow-sm border flex justify-between items-center',
                  searchFocus ? 'border-secondary' : 'border-gray-300'
                ]"
                placeholder="Search by something.."
                v-model="searchValue"
                @focus="() => {
                  searchFocus = true;
                }"
                @blur="searchBlurHandler"
              />
  
              <button type="submit" class="hidden"></button>
  
              <FontAwesomeIcon
                :icon="searchValue ? faTimes : faMagnifyingGlass"
                :class="[
                  'absolute top-1/2 -translate-y-1/2 right-6 text-lg cursor-pointer',
                  searchFocus ? 'text-secondary' : 'text-gray-400'
                ]"
                @click="() => {
                  searchValue = '';
                }"
              />
            </form>
          </div>
        </div>

        <div class="w-0.5 h-8 bg-gray-300"></div>

        <div class="w-3/4 flex lg:w-auto justify-end gap-3">
          <BaseButton
            label="Login"
            color="lightPrimary"
            variant="outline"
            size="sm"
            rounded="full"
          />
          <BaseButton
            label="Register"
            color="lightPrimary"
            variant="outline"
            size="sm"
            rounded="full"
          />
        </div>
      </div>
    </div>
  </div>
</template>