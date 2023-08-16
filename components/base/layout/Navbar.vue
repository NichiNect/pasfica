<script setup>
import { faCog, faPowerOff, faUserCog } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const props = defineProps(['children']);
const profile = ref(false);
const wrapProfile = ref(null);

/**
 * * Methods
 */
const clickOutsideHandler = (e) => {
  if (wrapProfile.current && 
    !wrapProfile.current.contains(e.target) && 
    profile.value) {

    profile.value = false;
  }
}

/**
 * * Hooks & Watcher
 */
watch([wrapProfile, profile], () => {
  document.addEventListener("mousedown", clickOutsideHandler);
});

</script>

<template>
  <div class="flex items-center justify-between p-4 bg-white rounded-xl relative shadow-sm">
    <div class="px-4">
      <slot />
    </div>

    <div class="flex gap-4">
      <div class="flex items-center gap-5 px-4" @mousedown="() => {
        profile = !profile;
      }">
        <div class="h-10 bg-white rounded-full aspect-quare overflow-hidden">
          <img src="~/assets/img/avatar.png" alt="Avatar Picture" class="w-[45px] h-auto">
        </div>

        <div>
          <h6 class="text-lg font-semibold">Yoni Widhi C.</h6>
          <h6 class="-mt-1 text-sm font-medium">Admin</h6>
        </div>

        <FontAwesomeIcon :icon="faCog" class="text-xl cursor-pointer" />
      </div>
    </div>

    <div :class="[
      'absolute right-0 top-14 rounded-xl shadow-md overflow-hidden bg-white z-10',
      profile ? 'scale-y-100' : 'scale-y-0'
    ]"
    :ref="wrapProfile"
    >
      <div class="flex items-center gap-6 px-8 py-6 rounded-b-xl shadow-md">
        <div class="h-16 bg-white border-4 border-secondary rounded-full aspect-square overflow-hidden">
          <img src="~/assets/img/avatar.png" alt="Avatar Picture">
        </div>
        <div class="pr-5">
          <h6 class="text-lg font-extrabold text-gray-800">Yoni Widhi C.</h6>
          <h6 class="text-sm font-medium text-gray-600">Admin</h6>
        </div>
      </div>

      <div class="py-5">
        <div class="flex gap-5 px-8 py-5 text-gray-700 hover:bg-lightPrimary hover:shadow-md cursor-pointer">
          <FontAwesomeIcon :icon="faUserCog" />
          <label class="cursor-pointer font-semibold">Edit Profile</label>
        </div>
        <div class="flex gap-5 px-8 py-4 hover:bg-lightPrimary hover:shadow-md cursor-pointer">
          <FontAwesomeIcon :icon="faPowerOff" />
          <label class="cursor-pointer font-semibold">Sign Out</label>
        </div>
      </div>
    </div>
  </div>
</template>
