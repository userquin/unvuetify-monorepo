import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import process from 'node:process'
import path from 'upath'

export interface VuetifyComponent {
  from: string
}

export type ComponentName = keyof typeof import('vuetify/components')
export type LabComponentName = keyof typeof import('vuetify/labs/components')
export type DirectiveName = keyof typeof import('vuetify/directives')
export interface VuetifyComponents {
  [key: string]: VuetifyComponent
}
export interface ImportComponents {
  components: VuetifyComponents
  directives: DirectiveName[]
}
export interface ImportLabsComponents {
  [key: string]: VuetifyComponent
}
export type ImportMaps = [importMaps: Promise<ImportComponents>, importMapsLabs: Promise<ImportLabsComponents>]

const require = createRequire(import.meta.url)

export function resolveVuetifyBase(paths = [process.cwd()]) {
  return path.dirname(require.resolve('vuetify/package.json', { paths }))
}

export function toKebabCase(str: string) {
  return str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()
}

export function mapComponent(prefix: boolean, name: string) {
  return prefix ? name.replace(/^V/, 'Vuetify') : name
}

/**
 * Creates Vuetify transform asset urls for Vue.
 *
 * **WARNING**: if you're prefixing Vuetify components you need to enable prefix.
 *
 * @param prefix {boolean} - Whether to prefix the component names with "Vuetify" (default false).
 */
export function createTransformAssetUrls(prefix = false) {
  const transformAssetUrls = {
    VAppBar: ['image'],
    VAvatar: ['image'],
    VBanner: ['avatar'],
    VCard: ['image', 'prependAvatar', 'appendAvatar'],
    VCardItem: ['prependAvatar', 'appendAvatar'],
    VCarouselItem: ['src', 'lazySrc', 'srcset'],
    VChip: ['prependAvatar', 'appendAvatar'],
    VImg: ['src', 'lazySrc', 'srcset'],
    VListItem: ['prependAvatar', 'appendAvatar'],
    VNavigationDrawer: ['image'],
    VParallax: ['src', 'lazySrc', 'srcset'],
    VToolbar: ['image'],
  } as Record<string, string[]>

  if (!prefix) {
    for (const [component, attrs] of Object.entries(transformAssetUrls)) {
      const useAttrs = [...attrs]
      for (const attr of attrs) {
        if (/[A-Z]/.test(attr)) {
          useAttrs.push(toKebabCase(attr))
        }
      }
      transformAssetUrls[toKebabCase(component)] = useAttrs
    }

    return transformAssetUrls
  }

  const result: Record<string, string[]> = {}
  for (const [component, attrs] of Object.entries(transformAssetUrls)) {
    const useComponent = mapComponent(true, component)
    const useAttrs = [...attrs]
    result[useComponent] = useAttrs
    for (const attr of attrs) {
      if (/[A-Z]/.test(attr)) {
        useAttrs.push(toKebabCase(attr))
      }
    }
    result[toKebabCase(useComponent)] = useAttrs
  }

  return result
}

export function resolveVuetifyImportMaps(
  paths = [process.cwd()],
): ImportMaps {
  const vuetifyBase = resolveVuetifyBase(paths)
  return [importMap(vuetifyBase), importMapLabs(vuetifyBase)]
}

export function resolveVuetifyImportMap(paths = [process.cwd()]) {
  return importMap(resolveVuetifyBase(paths))
}

export function resolveVuetifyImportMapLabs(paths = [process.cwd()]) {
  return importMapLabs(resolveVuetifyBase(paths))
}

// Vuetify 3.7.11+ resolves to subpath exports instead of a file in /lib
export function resolveVuetifyComponentFrom({ from }: VuetifyComponent) {
  return from.endsWith('.mjs') ? `lib/${from}` : from
}

async function importMap(vuetifyBase: string): Promise<ImportComponents> {
  return JSON.parse(await readFile(path.resolve(vuetifyBase, 'dist/json/importMap.json'), 'utf-8'))
}
async function importMapLabs(vuetifyBase: string): Promise<ImportLabsComponents> {
  return JSON.parse(await readFile(path.resolve(vuetifyBase, 'dist/json/importMap-labs.json'), 'utf-8'))
}
