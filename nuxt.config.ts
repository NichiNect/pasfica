// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
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
      baseAPI: process.env.NUXT_PUBLIC_API_BASE,
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  ssr: true
})
