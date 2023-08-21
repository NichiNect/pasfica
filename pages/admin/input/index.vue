<script setup>
import { faKey, faPhoneAlt, faUser, faWindowRestore } from '@fortawesome/free-solid-svg-icons';

/**
 * * Layouts
 */
 definePageMeta({
  layout: "admin",
});

</script>

<template>
  <div class="container grid grid-cols-3 gap-3 items-center my-5">
    <BaseInputDefault
      type="text"
      name="username"
      label="Username"
      placeholder="Fill your username.."
      iconPosition="left"
      :icon="faUser"
    />
    <BaseInputDefault
      type="password"
      name="password"
      label="Password"
      placeholder="Fill your password.."
      iconPosition="right"
      :icon="faKey"
    />
    <BaseInputDefault
      type="text"
      name="listBrowser"
      label="List Browser"
      placeholder="Fill your favorite browser.."
      iconPosition="left"
      :icon="faWindowRestore"
      :suggestionLists="[
        'Google Chrome', 'Chromium', 'Edge', 'Mozilla Firefox', 'Brave', 'Opera', 'Vivaldi'
      ]"
    />

    <BaseInputPhone 
      name="phoneNumber"
      label="Phone Number"
      placeholder="Fill your phone number.."
      iconPosition="left"
      :icon="faPhoneAlt"
      useFormat="62"
    />
  </div>
</template>