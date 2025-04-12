import type {
  ComponentName,
  DirectiveName,
  ImportComponents,
  ImportMaps,
  LabComponentName,
} from '@unvuetify/shared'
import type { ComponentResolver } from 'unplugin-vue-components/types'
import type {
  VuetifyComponentResolverOptions,
  VuetifyDirectivesResolverOptions,
} from './types'
import {
  prepareTransformAssetUrls,
  resolveVuetifyComponentFrom,
  resolveVuetifyImportMap,
  resolveVuetifyImportMaps,
} from '@unvuetify/shared'

export type * from './types'

export { prepareTransformAssetUrls }

export interface VuetifyVueResolverOptions extends Omit<VuetifyComponentResolverOptions, 'exclude'> {
  /**
   * Prefix Vuetify components (to allow use other components with the same name):
   * - when prefix set to `true` will use `Vuetify` => `vuetify-<component>/Vuetify<component>: `vuetify-btn/VuetifyBtn`.
   */
  prefixComponents?: true
  /**
   * Prefix Vuetify directives (to allow use other directives with the same name):
   * - when prefix set to `true` will use `Vuetify` => `v-vuetify-<directive>: `v-vuetify-ripple`.
   */
  prefixDirectives?: true
  /**
   * Directives to exclude.
   */
  excludeDirectives?: DirectiveName[]
  /**
   * Components to exclude.
   */
  excludeComponents?: (ComponentName | LabComponentName)[]
}

export function VuetifyVueResolver(options: VuetifyVueResolverOptions = {}) {
  const {
    paths,
    excludeDirectives,
    labs = true,
    excludeComponents,
    prefixComponents,
    prefixDirectives,
  } = options

  const [componentsPromise, directivesPromise] = resolveVuetifyImportMaps(paths)

  const directives = createDirectivesResolver(
    componentsPromise,
    { exclude: excludeDirectives, paths, prefix: prefixDirectives },
  )
  const components = createComponentsResolver(
    [componentsPromise, directivesPromise],
    { exclude: excludeComponents, labs, paths, prefix: prefixComponents },
  )

  return {
    transformAssetUrls: prepareTransformAssetUrls(prefixComponents === true),
    VuetifyDirectiveResolver: directives,
    VuetifyComponentResolver: components,
  }
}

/**
 * Vuetify directives resolver for `unplugin-vue-components`.
 *
 * **WARNING**: current version of `unplugin-vue-components` does not configure correctly the directives
 * and won't work with `Vuetify` directives, use `unplugin-auto-import` with Vuetify directives
 * preset from `unimport-presets` subpackage export.
 *
 * @see https://github.com/unplugin/unplugin-vue-components/pull/828
 */
export function VuetifyDirectiveResolver(options: VuetifyDirectivesResolverOptions = {}) {
  return createDirectivesResolver(resolveVuetifyImportMap(options.paths), options)
}

export function VuetifyComponentResolver(options: VuetifyComponentResolverOptions = {}) {
  return createComponentsResolver(resolveVuetifyImportMaps(options.paths), options)
}

function createComponentsResolver(
  promises: ImportMaps,
  options: VuetifyComponentResolverOptions,
) {
  const { exclude, labs, prefix } = options
  return {
    type: 'component',
    resolve: async (name) => {
      let vuetifyName = name
      if (prefix) {
        if (!name.startsWith('Vuetify')) {
          return undefined
        }
        vuetifyName = `V${name.slice('Vuetify'.length)}`
      }
      if (exclude?.some(e => e === vuetifyName))
        return undefined
      const [components, labsComponents] = await Promise.all(promises)
      const component = vuetifyName in components.components
        ? components.components[vuetifyName]
        : labs && vuetifyName in labsComponents
          ? labsComponents[vuetifyName]
          : undefined

      if (!component)
        return undefined
      return {
        name: vuetifyName,
        as: prefix ? name : undefined,
        type: 'component',
        from: `vuetify/${resolveVuetifyComponentFrom(component)}`,
      }
    },
  } satisfies ComponentResolver
}

function createDirectivesResolver(
  promise: Promise<ImportComponents>,
  options: VuetifyDirectivesResolverOptions,
) {
  const { exclude, prefix } = options
  // Vue will transform v-<directive> to _resolveDirective('<directive>')
  // If prefix enabled, Vue will transform v-vuetify-<directive> to _resolveDirective('vuetify-<directive>')
  // unplugin-vue-components will provide the correct import when calling resolve: PascalCase(<directive>)
  // If prefix enabled, unplugin-vue-components will provide PascalCase(vuetify-<directive>)
  return {
    type: 'directive',
    resolve: async (resolvedName) => {
      let name = resolvedName
      if (prefix) {
        if (!name.startsWith('Vuetify')) {
          return undefined
        }
        name = name.slice('Vuetify'.length)
      }
      if (exclude?.some(e => e === name))
        return undefined
      const { directives } = await promise
      const directive = directives.includes(name as DirectiveName)
      if (!directive)
        return undefined

      return {
        name,
        as: prefix ? resolvedName : undefined,
        from: `vuetify/directives`,
      }
    },
  } satisfies ComponentResolver
}
