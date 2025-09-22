import type {
  DirectiveName,
  VuetifyComponent,
} from '@unvuetify/shared'
import type { Addon, AddonsOptions, InlinePreset, PresetImport } from 'unimport'
import type {
  VuetifyComponentInfo,
  VuetifyComponentsOptions,
  VuetifyComposablesOptions,
  VuetifyDirectivesOptions,
} from './types'
import {
  createTransformAssetUrls,
  mapComponent,
  resolveVuetifyComponentFrom,
  resolveVuetifyImportMaps,
  toKebabCase,
} from '@unvuetify/shared'

export type * from './types'

export { createTransformAssetUrls }

export function VuetifyComposables(options: VuetifyComposablesOptions = {}) {
  const { prefix } = options
  const composableImports: [link: string, name: string][] = [
    ['use-date', 'useDate'],
    ['use-defaults', 'useDefaults'],
    ['use-display', 'useDisplay'],
    ['use-go-to', 'useGoTo'],
    ['use-layout', 'useLayout'],
    ['use-locale', 'useLocale'],
    ['use-rtl', 'useRtl'],
    ['use-theme', 'useTheme'],
    ['use-mask', 'useMask'],
    ['use-hotkey', 'useHotkey'],
  ]
  const imports = typeof prefix === 'string'
    ? composableImports.map(([l, n]) => [l, n, n.replace('use', `use${prefix}`)])
    : prefix
      ? composableImports.map(([l, n]) => [l, n, n.replace('use', 'useV')])
      : composableImports
  return {
    from: 'vuetify',
    imports: imports.map<PresetImport>(([link, name, renamed]) => ({
      name: name!,
      as: renamed,
      meta: { docsUrl: `https://vuetifyjs.com/en/api/${link}/` },
    })),
  } satisfies InlinePreset
}

export function VuetifyLabsComposables(options: VuetifyComposablesOptions = {}) {
  const { prefix } = options
  const composableImports: [from: string, link: string, name: string][] = [
    ['vuetify/labs/rules', 'rules', 'useRules'],
  ]
  const imports = typeof prefix === 'string'
    ? composableImports.map(([f, l, n]) => [f, l, n, n.replace('use', `use${prefix}`)])
    : prefix
      ? composableImports.map(([f, l, n]) => [f, l, n, n.replace('use', 'useV')])
      : composableImports

  return imports.map<InlinePreset>(([from, link, name, renamed]) => ({
    from,
    imports: [{
      name: name!,
      as: renamed,
      meta: { docsUrl: `https://vuetifyjs.com/en/features/${link}/` },
    }],
  }))
}

export function VuetifyDirectives(options: VuetifyDirectivesOptions = {}) {
  const { exclude, prefix } = options
  const directivesImports: [link: string, name: DirectiveName][] = [
    ['click-outside', 'ClickOutside'],
    ['intersect', 'Intersect'],
    ['mutate', 'Mutate'],
    ['resize', 'Resize'],
    ['ripple', 'Ripple'],
    ['scroll', 'Scroll'],
    ['touch', 'Touch'],
    ['tooltip', 'Tooltip'],
  ]

  const directives = directivesImports.filter(entry => !exclude || !exclude.includes(entry[1]))

  return {
    from: 'vuetify/directives',
    meta: {
      vueDirective: true,
    },
    imports: directives.map<PresetImport>(([link, name]) => ({
      name,
      as: prefix ? `Vuetify${name}` : undefined,
      meta: {
        vueDirective: true,
        docsUrl: `https://vuetifyjs.com/en/api/v-${link}-directive/`,
      },
    })),
  } satisfies InlinePreset
}

export function enableDirectives(addons?: AddonsOptions | Addon[]): AddonsOptions {
  if (!addons) {
    return { vueDirectives: true }
  }

  if (Array.isArray(addons)) {
    return { vueDirectives: true, addons }
  }

  return {
    ...addons,
    vueDirectives: addons.vueDirectives ?? true,
    addons: addons.addons,
  }
}

export async function prepareVuetifyComponents(options: VuetifyComponentsOptions = {}) {
  const { prefix = false, exclude = [] } = options
  const info: VuetifyComponentInfo[] = []
  const [components, labs] = await Promise.all(
    resolveVuetifyImportMaps(),
  )

  const map = new Map<string, VuetifyComponent & { name: string }>()
  for (const [component, entry] of Object.entries(components.components)) {
    if (exclude.length > 0 && exclude.includes(component as any)) {
      continue
    }
    map.set(mapComponent(prefix, component), {
      from: `vuetify/${resolveVuetifyComponentFrom(entry)}`,
      name: component,
    })
  }
  for (const [component, entry] of Object.entries(labs.components)) {
    if (exclude.length > 0 && exclude.includes(component as any)) {
      continue
    }
    map.set(mapComponent(prefix, component), {
      from: `vuetify/${resolveVuetifyComponentFrom(entry)}`,
      name: component,
    })
  }

  for (const [component, entry] of map.entries()) {
    info.push({
      pascalName: component,
      kebabName: toKebabCase(component),
      export: entry.name,
      filePath: entry.from,
    })
  }

  return info
}

export function normalizeTransformAssetUrls(transformAssetUrls: Record<string, string[]>) {
  /*
  We need to cover these 4 cases:

<VCard :appendAvatar="~/assets/logo.svg"/>
<v-card :append-avatar="~/assets/logo.svg" />
<VCard appendAvatar="~/assets/logo.svg"/>
<v-card append-avatar="~/assets/logo.svg" />
   */
  const names = new Set(Object.keys(transformAssetUrls))
  let kebab: string
  let pascal: string
  for (const name of names) {
    transformAssetUrls[name] = normalizeTransformAssetUrlsAttrs(transformAssetUrls[name]!)
    kebab = toKebabCase(name)
    pascal = pascalize(name)
    if (!names.has(kebab))
      transformAssetUrls[kebab] = [...transformAssetUrls[name]]

    if (!names.has(pascal))
      transformAssetUrls[pascal] = [...transformAssetUrls[name]]
  }

  return transformAssetUrls
}

export function normalizeTransformAssetUrlsAttrs(attrs: string[]) {
  const result = new Set<string>()
  let kebab: string
  let camel: string
  let bind: boolean
  let idx: number
  for (const attr of attrs) {
    result.add(attr)
    idx = attr.indexOf(':')
    if (idx > 0)
      continue

    bind = idx === 0
    kebab = toKebabCase(bind ? attr.slice(1) : attr)
    camel = camelize(bind ? attr.slice(1) : attr)
    result.add(kebab)
    result.add(camel)
    result.add(`:${kebab}`)
    result.add(`:${camel}`)
  }

  return [...result]
}

function camelize(str: string): string {
  return str.replace(/-([a-z0-9])/g, g => g[1].toUpperCase())
}

function pascalize(str: string): string {
  let pascal = camelize(str)
  pascal = pascal.slice(0, 1).toUpperCase() + pascal.slice(1)
  return pascal
}
