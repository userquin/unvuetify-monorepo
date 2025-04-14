import type { Nuxt, ViteConfig } from '@nuxt/schema'
import type {
  VuetifyComponentsOptions,
  VuetifyComposablesOptions,
  VuetifyDirectivesOptions,
} from '@unvuetify/unimport-presets'
import type { VuetifyStylesOptions } from '@unvuetify/vite-styles-plugin'
import type { AssetURLOptions, AssetURLTagConfig } from '@vue/compiler-sfc'
import type { Addon, AddonsOptions } from 'unimport'
import {
  createTransformAssetUrls,
  enableDirectives,
  normalizeTransformAssetUrls,
  prepareVuetifyComponents,
  VuetifyComposables,
  VuetifyDirectives,
} from '@unvuetify/unimport-presets'
import { VuetifyStylesVitePlugin } from '@unvuetify/vite-styles-plugin'
import defu from 'defu'

export type {
  VuetifyComponentsOptions,
  VuetifyComposablesOptions,
  VuetifyDirectivesOptions,
  VuetifyStylesOptions,
}

export interface VuetifyNuxtOptions {
  directives?: VuetifyDirectivesOptions
  components?: VuetifyComponentsOptions
  composables?: VuetifyComposablesOptions
  styles?: VuetifyStylesOptions
}

export function configureVuetify(nuxt: Nuxt, options: VuetifyNuxtOptions = {}) {
  const {
    directives,
    composables,
    components,
    styles,
  } = options

  const imports = nuxt.options.imports
  imports.addons = enableDirectives(imports.addons as AddonsOptions | Addon[] | undefined)

  nuxt.hook('imports:sources', (sources) => {
    sources.push(
      VuetifyDirectives(directives),
      VuetifyComposables(composables),
    )
  })

  nuxt.hook('components:extend', async (registry) => {
    const c = await prepareVuetifyComponents(components)
    for (const component of c) {
      registry.push({
        pascalName: component.pascalName,
        kebabName: component.kebabName,
        export: component.export,
        filePath: component.filePath,
        shortPath: component.filePath,
        chunkName: component.kebabName,
        prefetch: false,
        preload: false,
        global: false,
        mode: 'all',
      })
    }
  })

  nuxt.hook('vite:extendConfig', (viteInlineConfig) => {
    viteInlineConfig.optimizeDeps = defu(viteInlineConfig.optimizeDeps, {
      exclude: ['vuetify'],
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
        'vuetify',
      ]
    }

    const transformAssetUrls = configureTransformAssetUrls(
      components?.prefix === true,
      viteInlineConfig,
    )
    viteInlineConfig.vue ??= {}
    viteInlineConfig.vue.template ??= {}
    viteInlineConfig.vue.template.transformAssetUrls = transformAssetUrls

    viteInlineConfig.plugins = viteInlineConfig.plugins || []
    viteInlineConfig.plugins.push(VuetifyStylesVitePlugin(styles))
  })
}

function configureTransformAssetUrls(prefix: boolean, viteInlineConfig: ViteConfig) {
  let existingTransformAssetUrls = viteInlineConfig.vue?.template?.transformAssetUrls ?? {}

  let useURLOptions: AssetURLOptions | undefined
  if (typeof existingTransformAssetUrls === 'boolean') {
    existingTransformAssetUrls = {}
  }
  else if ('base' in existingTransformAssetUrls || 'includeAbsolute' in existingTransformAssetUrls || 'tags' in existingTransformAssetUrls) {
    useURLOptions = {
      base: existingTransformAssetUrls.base as string | undefined,
      includeAbsolute: existingTransformAssetUrls.includeAbsolute as boolean | undefined,
    }
    existingTransformAssetUrls = (existingTransformAssetUrls.tags ?? {}) as Record<string, string[]>
  }

  const prefixed = createTransformAssetUrls(prefix)

  const transformAssetUrls = normalizeTransformAssetUrls(
    defu(existingTransformAssetUrls, prefixed),
  )

  if (!useURLOptions)
    return transformAssetUrls satisfies AssetURLTagConfig

  useURLOptions.tags = transformAssetUrls
  return useURLOptions
}
