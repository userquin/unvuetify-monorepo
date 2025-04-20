import process from 'node:process'
import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

const SUFFIX = process.env.TYPECHECK === 'true' ? '/dist' : '/src/index'
const RUNTIME_SUFFIX = process.env.TYPECHECK === 'true' ? '/dist/runtime/' : '/src/runtime/index'

const r = (path: string) => resolver.resolve(path)

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

  /** ONLY REQUIRED IN THE MONOREPO */
  alias: {
    '@unvuetify/nuxt-i18n-utils/runtime': r(`../../packages/nuxt-i18n-utils${RUNTIME_SUFFIX}`),
    '@unvuetify/nuxt-i18n-utils': r(`../../packages/nuxt-i18n-utils${SUFFIX}`),
    '@unvuetify/nuxt-utils': r(`../../packages/nuxt-utils${SUFFIX}`),
    '@unvuetify/shared': r(`../../packages/shared${SUFFIX}`),
    '@unvuetify/vite-styles-plugin': r(`../../packages/styles-plugin${SUFFIX}`),
    '@unvuetify/unimport-presets': r(`../../packages/unimport-presets${SUFFIX}`),
  },

  /** ONLY REQUIRED IN THE MONOREPO */
  nitro: {
    alias: {
      '@unvuetify/nuxt-i18n-utils/runtime': r(`../../packages/nuxt-i18n-utils${RUNTIME_SUFFIX}`),
    },
  },

  vuetify: {
    composables: { prefix: true },
  },

  i18n: {
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
