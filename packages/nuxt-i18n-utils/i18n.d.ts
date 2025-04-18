declare module '#imports' {
  import type { NuxtApp } from '@nuxt/schema'
  import type { LocaleObject, ModuleRuntimeHooks } from '@nuxtjs/i18n'
  import type { Locale, UseI18nOptions } from 'vue-i18n'
  import { useI18n } from 'vue-i18n'

  type Composer = typeof useI18n<UseI18nOptions>

  type I18n = ReturnType<Composer> & {
    locales: ComputedRef<Locale[] | LocaleObject[]>
    setLocale: (locale: Locale) => Promise<void>
    locale: Locale
    fallbackLocale?: Ref<Locale>
  }

  declare function useNuxtApp(): NuxtApp & {
    $i18n: I18n
  } & {
    hook: <H extends keyof ModuleRuntimeHooks>(hook: H, callback: ModuleRuntimeHooks[H]) => void
  }

  export { useI18n, useNuxtApp }
}
