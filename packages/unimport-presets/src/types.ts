import type {
  ComponentName,
  DirectiveName,
  LabComponentName,
} from '@unvuetify/shared'

export type { ComponentName, DirectiveName, LabComponentName }

export interface VuetifyComponentInfo {
  pascalName: string
  kebabName: string
  export: string
  filePath: string
}

export interface VuetifyComposablesOptions {
  /**
   * Prefix Vuetify composables (to allow use other composables with the same name):
   * - when prefix set to `true` will use `useV`: `useVDate`.
   * - when prefix is a string will use `use<prefix>`: `useVuetifyDate` with `prefix: 'Vuetify'`.
   */
  prefix?: true | string
}

export interface VuetifyDirectivesOptions {
  /**
   * Prefix Vuetify directives (to allow use other directives with the same name):
   * - when prefix set to `true` will use `Vuetify` => `v-vuetify-<directive>: `v-vuetify-ripple`.
   */
  prefix?: true
  /**
   * Directives to exclude.
   */
  exclude?: DirectiveName[]
}

export interface VuetifyComponentsOptions {
  /**
   * Prefix Vuetify components (to allow use other components with the same name):
   * - when prefix set to `true` will use `Vuetify` => `vuetify-<component>/Vuetify<component>: `vuetify-btn/VuetifyBtn`.
   */
  prefix?: true
  /**
   * Components to exclude.
   */
  exclude?: (ComponentName | LabComponentName)[]
}
