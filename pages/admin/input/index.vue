<script setup>
import { faEnvelope, faKey, faUser, faWindowRestore } from '@fortawesome/free-solid-svg-icons';

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
  </div>
</template>