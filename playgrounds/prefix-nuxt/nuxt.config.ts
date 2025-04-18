import process from 'node:process'
import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

const SUFFIX = process.env.TYPECHECK === 'true' ? '/dist' : '/src/index'

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
    '@unvuetify/nuxt-utils': r(`../../packages/nuxt-utils${SUFFIX}`),
    '@unvuetify/shared': r(`../../packages/shared${SUFFIX}`),
    '@unvuetify/vite-styles-plugin': r(`../../packages/styles-plugin${SUFFIX}`),
    '@unvuetify/unimport-presets': r(`../../packages/unimport-presets${SUFFIX}`),
  },
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
