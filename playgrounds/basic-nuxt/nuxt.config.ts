import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

const r = (path: string) => resolver.resolve(path)

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
  alias: {
    '@unvuetify/shared': r('../../packages/shared/src/index'),
    '@unvuetify/vite-styles-plugin': r('../../packages/styles-plugin/src/index'),
    '@unvuetify/unimport-presets': r('../../packages/unimport-presets/src/index'),
  },
  modules: ['@nuxt/fonts'],

  vuetify: {
    styles: {
      mode: {
        configFile: 'assets/settings.scss',
      },
    },
  },
})
