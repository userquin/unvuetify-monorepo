// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  ssr: true,

  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    inlineStyles: false,
    devLogs: false,
  },

  css: [
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/styles',
  ],

  modules: ['@nuxt/fonts'],

  vuetify: {
    components: { prefix: true },
    composables: { prefix: true },
    directives: { prefix: true },
    styles: {
      mode: {
        configFile: 'assets/settings.scss',
      },
    },
  },
})
