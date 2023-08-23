<script setup>
import { faCalendarAlt, faKey, faMoneyBillWave, faPhoneAlt, faSortAmountAsc, faUser, faWindowRestore } from '@fortawesome/free-solid-svg-icons';

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
    <BaseInputNumber 
      name="counter"
      label="Counter Amount"
      placeholder="Fill your amount number.."
      iconPosition="right"
      :icon="faSortAmountAsc"
      useFormat="62"
      minValue="0"
      maxValue="10"
    />
    <BaseInputCurrency 
      name="price"
      label="Price"
      placeholder="Fill price.."
      iconPosition="left"
      :icon="faMoneyBillWave"
      minValue="0"
    />

    <BaseInputDate 
      name="datePicker"
      label="Date Picker"
      placeholder="Fill date picker.."
      iconPosition="left"
      :icon="faCalendarAlt"
      mode="dateTime"
      useFormat="DD-MM-YYYY HH:mm:ss"
    />
    <BaseInputDateRange
      name="dateRangePicker"
      label="Date Range Picker"
      placeholder="Fill date range picker.."
      iconPosition="right"
      :icon="faCalendarAlt"
      mode="date"
      useFormat="DD-MM-YYYY"
    />
  </div>
</template>