import type {
  ComponentName,
  DirectiveName,
  LabComponentName,
} from '@unvuetify/shared'

export type { ComponentName, DirectiveName, LabComponentName }

export interface VuetifyComponentResolverOptions {
  /**
   * Prefix Vuetify components (to allow use other components with the same name):
   * - when prefix set to `true` will use `Vuetify` => `vuetify-<component>/Vuetify<component>: `vuetify-btn/VuetifyBtn`.
   */
  prefix?: true
  /**
   * Include labs components?.
   *
   * @default true
   */
  labs?: boolean
  /**
   * Components to exclude.
   */
  exclude?: (ComponentName | LabComponentName)[]
  /**
   * Paths to locate Vuetify package.
   *
   * @default [process.cwd()]
   */
  paths?: string[]
}

export interface VuetifyDirectivesResolverOptions {
  /**
   * Prefix Vuetify directives (to allow use other directives with the same name):
   * - when prefix set to `true` will use `Vuetify` => `v-vuetify-<directive>: `v-vuetify-ripple`.
   */
  prefix?: true
  /**
   * Directives to exclude.
   */
  exclude?: DirectiveName[]
  /**
   * Paths to locate Vuetify package.
   *
   * @default [process.cwd()]
   */
  paths?: string[]
}

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
