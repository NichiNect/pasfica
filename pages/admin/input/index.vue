<script setup>
import { faCalendarAlt, faKey, faMoneyBillWave, faPhoneAlt, faSortAmountAsc, faUser, faWindowRestore } from '@fortawesome/free-solid-svg-icons';

/**
 * * Layouts
 */
definePageMeta({
  layout: "admin",
});

/**
 * * Variables
 */
const remember = ref(false);

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
      :validations="['required', 'min:6', 'max:10']"
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
      :validations="['min:10']"
    />
    <BaseInputNumber 
      name="counter"
      label="Counter Amount"
      placeholder="Fill your amount number.."
      iconPosition="right"
      :icon="faSortAmountAsc"
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
    <BaseInputCheckbox
      name="rememberMe"
      label="Remember Me"
      color="success"
      size="md"
      inputValue="remember"
      :checked="remember"
      @onChange="(data) => {
        remember = !remember
        console.log(data);
      }"
    />

    <BaseInputTextarea
      name="note"
      label="Note"
      placeholder="Fill note.."
      :validations="['min:6']"
    />
    <BaseInputImage
      name="avatar"
      label="Avatar"
      aspect="square"
    />
    <BaseInputFile
      name="uploadLetter"
      label="Upload your legal letter.."
      aria-label="uploadLetter"
    />
    <BaseInputRadio
      name="hoho"
      label="Accept"
      inputValue="agree"
      @onChange="(data) => {
        console.log(data);
      }"
    />
    <BaseInputSelect
      name="role"
      label="Role"
      placeholder="Fill role.."
      iconPosition="left"
      :icon="faWindowRestore"
      :searchable="true"
      :options="[
        {
          label: 'Superadmin',
          value: 1
        },
        {
          label: 'Admin',
          value: 2
        },
        {
          label: 'User',
          value: 3
        },
        {
          label: 'Membership',
          value: 4
        },
        {
          label: 'Officer',
          value: 5
        }
      ]"
      @onChange="(data) => {
        console.log('valdata', data);
      }"
    />
    <BaseInputSelect
      name="favoriteOS"
      label="Favorite Operating System"
      placeholder="Choose one.."
      :options="[
        {
          label: 'Linux',
          value: 1
        },
        {
          label: 'MacOS',
          value: 2
        },
        {
          label: 'Windows',
          value: 3
        },
        {
          label: 'Android',
          value: 4
        },
        {
          label: 'iOS',
          value: 5
        }
      ]"
      @onChange="(data) => {
        console.log('valdata', data);
      }"
    />

    <BaseInputSelect
      name="category"
      label="Category Product"
      placeholder="Choose one.."
      :searchable="true"
      :serverSideControl="{
        apiUrl: 'http://localhost:3000/api/picklist/categories',
        searchQueryKey: 'search',
      }"
    />
    <BaseInputSelect2
      name="productCategory"
      label="Category Product Super"
      placeholder="Choose One"
      :searchable="true"
      :multiple="true"
      :inputValue="{
        label: 'Computer',
        value: 'computer',
      }"
      :serverSideControl="{
        apiUrl: `http://localhost:3000/api/picklist/categories`,
        searchQueryKey: 'search',
      }"
      :validations="['required']"
      @onChange="(val) => console.log('onchange val', val)"
    />
  </div>
</template>