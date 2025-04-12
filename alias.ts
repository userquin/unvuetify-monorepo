import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

function r(p: string) {
  return resolve(fileURLToPath(new URL('.', import.meta.url)), p)
}

type Key = 'presets' | 'resolvers' | 'shared' | 'vite' | 'nuxt'

export const alias: Record<Key, Record<string, string>> = {
  vite: {},
  nuxt: {},
  presets: {
    '@unvuetify/unimport-presets': r('./packages/unimport-presets/src/'),
  },
  resolvers: {
    '@unvuetify/unplugin-vue-components-resolvers': r('./packages/unplugin-vue-components-resolvers/src/'),
  },
  shared: {
    '@unvuetify/vite-styles-plugin': r('./packages/styles/src/'),
  },
}
