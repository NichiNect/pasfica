// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  plugins: [
    { src: '~/plugins/vcalendar.js', mode: 'client' },
  ],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/general.css'
  ]
})
