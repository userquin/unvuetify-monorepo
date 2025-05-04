// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/i18n'],

  css: [
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/styles',
  ],

  vuetify: {
    composables: { prefix: true },
  },

  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    // if not using RTL, you can replace locales with codes only
    // locales: ['en', 'es', 'ar'],
    locales: [{
      code: 'en',
      name: 'English',
    }, {
      code: 'es',
      name: 'Español',
    }, {
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
    }],
    defaultLocale: 'en',
    strategy: 'no_prefix', // or 'prefix_except_default'
    vueI18n: './i18n.config.ts',
  },
})
