// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-swiper'
  ],

  plugins: [
    { src: '~/plugins/vcalendar.js', mode: 'client' },
  ],

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/general.css',
    '~/assets/css/table.css',
  ],

  runtimeConfig: {
    public: {
      baseAPI: process.env.API_BASE_URL,
      baseURL: process.env.APP_URL,
    },
  },

  ssr: true,
  compatibilityDate: '2024-07-03'
})
