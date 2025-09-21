import type { Ref } from '#imports'
import type { LocaleObject } from '@nuxtjs/i18n'
import type { Locale } from 'vue-i18n'
import type { DateOptions, LocaleInstance, LocaleMessages, LocaleOptions, VuetifyOptions } from 'vuetify'
import { ref, toRef, useI18n, useNuxtApp, watch } from '#imports'

export interface VuetifyI18nAdapterOptions {
  /**
   * Whether to override the default entries from Vuetify options:
   * - locale
   * - fallback
   * - messages
   *
   * If any of the previous entries are not set, they will be configured with the values from i18n.
   *
   * @default false
   */
  override?: boolean
  /**
   * Default locales list `rtl` used when using `@nuxtjs/i18n` locales without object notation.
   *
   * @default ['ar', 'he', 'fa', 'ur']
   */
  rtlLocales?: string[]
}

/**
 * Configure Vuetify i18n date locale.
 *
 * @param dateOptions The Vuetify date options.
 */
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

/**
 * Configure Vuetify i18n adapter.
 * @param vuetifyOptions The vuetify options.
 * @param options The options to configure the i18n adapter.
 *
 * @see https://vuetifyjs.com/en/features/internationalization
 */
export function configureVuetifyI18nAdapter(
  vuetifyOptions: VuetifyOptions,
  options: VuetifyI18nAdapterOptions = {},
) {
  const {
    rtlLocales = ['ar', 'he', 'fa', 'ur'],
    override,
  } = options
  vuetifyOptions.locale ??= {}
  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.$i18n
  const current = i18n.locale
  const fallback = i18n.fallbackLocale
  const messages = i18n.messages
  const currentLocale = ref<Locale>(current.value)
  const locales: Locale[] | LocaleObject[] = i18n.locales.value

  if (!vuetifyOptions.locale.locale || override) {
    vuetifyOptions.locale.locale = current.value
  }
  if (!vuetifyOptions.locale.fallback || override) {
    vuetifyOptions.locale.fallback = fallback.value
  }
  if (!vuetifyOptions.locale.messages || override) {
    vuetifyOptions.locale.messages = messages.value
  }

  vuetifyOptions.locale.rtl = locales.reduce((acc, locale) => {
    if (typeof locale === 'string')
      acc[locale] = rtlLocales.includes(locale)
    else
      acc[locale.code] = locale.dir === 'rtl'

    return acc
  }, {} as Record<string, boolean>)

  watch(currentLocale, (val, oldVal) => {
    if (oldVal)
      i18n.setLocale(val)
  }, { immediate: true, flush: 'post' })

  nuxtApp.hook('i18n:localeSwitched', ({ newLocale }) => {
    currentLocale.value = newLocale
  })

  vuetifyOptions.locale.adapter = {
    name: '@unvuetify:nuxt-i18n-utils:adapter',
    current: currentLocale,
    fallback,
    messages,
    decimalSeparator: toRef(() => vuetifyOptions.locale?.decimalSeparator ?? inferDecimalSeparator(i18n.n)),
    t: (key, ...params) => i18n.t(key, params),
    n: i18n.n,
    provide: createProvideFunction({ current: currentLocale, fallback, messages }),
  }
}

function inferDecimalSeparator(format: (v: number) => string) {
  return format(0.1).includes(',') ? ',' : '.'
}

// todo: add formatNumber, formatCurrency, formatDateTime, formatDate, formatTime...
function createProvideFunction(data: {
  current: Ref<string>
  fallback: Ref<string>
  messages: Ref<LocaleMessages>
}) {
  return (props: LocaleOptions) => {
    const currentLocale = ref(props.locale ?? data.current.value)

    const i18n = useI18n({
      locale: currentLocale.value,
      fallbackLocale: data.fallback.value,
      messages: data.messages.value as any,
      useScope: 'local',
      legacy: false,
      inheritLocale: false,
    })

    watch(currentLocale, (val, oldVal) => {
      if (oldVal)
        // @ts-expect-error i18n missing
        i18n.setLocale(val)
    }, { immediate: true, flush: 'post' })

    const t = wrapI18n(i18n.t)
    const n = wrapI18n(i18n.n)

    return <LocaleInstance>{
      name: '@unvuetify:nuxt-i18n-utils:adapter',
      current: currentLocale,
      fallback: data.fallback,
      messages: data.messages,
      decimalSeparator: toRef(() => props.decimalSeparator ?? inferDecimalSeparator(i18n.n)),
      t,
      n,
      provide: createProvideFunction({ current: currentLocale, fallback: data.fallback, messages: data.messages }),
    }
  }
}

function wrapI18n<T extends (...args: any[]) => any>(t: T): T {
  return <T>((...args: any[]) => {
    return t(...args)
  })
}
