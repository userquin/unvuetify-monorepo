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
  mapComponent,
  resolveVuetifyComponentFrom,
  resolveVuetifyImportMaps,
  toKebabCase,
} from '@unvuetify/shared'

export type * from './types'

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
