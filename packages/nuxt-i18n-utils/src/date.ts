import type { LocaleObject } from '@nuxtjs/i18n'
import type { Locale } from 'vue-i18n'
import type { DateOptions } from 'vuetify'
import { useNuxtApp } from '#imports'

export function configureVuetifyI18nDateLocale(dateOptions: DateOptions) {
  const locales: Locale[] | LocaleObject[] = useNuxtApp().$i18n.locales.value
  if (locales) {
    dateOptions.locale = locales.reduce((acc, locale) => {
      if (typeof locale === 'string') {
        acc[locale] = locale
      }
      else {
        acc[locale.code] = locale.code
      }
      return acc
    }, <Record<string, any>>{})
  }
}
