import type { ValidationRuleBuilderWithoutOptions } from 'vuetify/labs/rules'
import { createVuetify } from 'vuetify'
import { createRulesPlugin } from 'vuetify/labs/rules'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'dark',
    },
  })
  nuxtApp.vueApp.use(vuetify)
  nuxtApp.vueApp.use(createRulesPlugin({
    aliases: {
      pinCode: <ValidationRuleBuilderWithoutOptions>((err) => {
        return v => (/^\d{4}$/.test(v)) || err || 'Field must contain a 4-digit PIN'
      }),
    },
  }, vuetify.locale))
})
