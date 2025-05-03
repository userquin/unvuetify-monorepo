import type { Nuxt } from '@nuxt/schema'
import { defu } from 'defu'

export function configureI18n(nuxt: Nuxt) {
  nuxt.options.build.transpile.push('@unvuetify/nuxt-i18n-utils/runtime')
  nuxt.options.build.transpile.push(/@unvuetify[\\/]nuxt-i18n-utils[\\/]dist[\\/]runtime[\\/]index\.mjs$/)
  nuxt.hook('vite:extendConfig', (viteInlineConfig) => {
    viteInlineConfig.optimizeDeps = defu(viteInlineConfig.optimizeDeps, {
      exclude: ['@unvuetify/nuxt-i18n-utils/runtime'],
    })
    if (nuxt.options.ssr) {
      viteInlineConfig.ssr ||= {}
      viteInlineConfig.ssr.noExternal = [
        ...(Array.isArray(viteInlineConfig.ssr.noExternal)
          ? viteInlineConfig.ssr.noExternal
          : viteInlineConfig.ssr.noExternal && typeof viteInlineConfig.ssr.noExternal !== 'boolean'
            ? [viteInlineConfig.ssr.noExternal]
            : []
        ),
        '@unvuetify/nuxt-i18n-utils/runtime',
        /@unvuetify[\\/]nuxt-i18n-utils[\\/]dist[\\/]runtime[\\/]index\.mjs$/,
      ]
    }
  })
}
