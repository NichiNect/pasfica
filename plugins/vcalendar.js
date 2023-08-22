import 'v-calendar/style.css';
import { Calendar, DatePicker } from 'v-calendar';


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VDatePicker', DatePicker);
  nuxtApp.vueApp.component('VCalendar', Calendar);
})
