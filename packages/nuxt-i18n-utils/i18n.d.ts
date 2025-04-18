declare module '#imports' {
  import type { NuxtApp } from '@nuxt/schema'
  import type { useI18n } from 'vue-i18n'

  declare function useNuxtApp(): NuxtApp & { $i18n: ReturnType<typeof useI18n> }
  export { useNuxtApp }
}
