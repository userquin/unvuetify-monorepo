import type { VuetifyOptions } from 'vuetify'
import { configureVuetifyI18nAdapter } from '@unvuetify/nuxt-i18n-utils/runtime'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    theme: {
      defaultTheme: 'dark',
    },
  } satisfies VuetifyOptions
  configureVuetifyI18nAdapter(options)
  const vuetify = createVuetify(options)
  nuxtApp.vueApp.use(vuetify)
  return {
    provide: {
      vuetify,
    },
  }
})
