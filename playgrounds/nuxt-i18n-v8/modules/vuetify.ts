import type { VuetifyNuxtOptions } from '@unvuetify/nuxt-utils'
import { defineNuxtModule } from '@nuxt/kit'
import { configureVuetify } from '@unvuetify/nuxt-utils'
import { configureI18n } from '@unvuetify/nuxt-i18n-utils'

export interface ModuleOptions extends VuetifyNuxtOptions {
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vuetify:nuxt-module',
    configKey: 'vuetify',
    compatibility: {
      nuxt: '>=3.0.0',
    },
    default: {},
  },
  setup(options, nuxt) {
    configureVuetify(nuxt, options)
    configureI18n(nuxt)
  },
})
