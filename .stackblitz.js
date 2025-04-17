import fsPromises from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

const SB = process?.env?.SHELL === '/bin/jsh' && process?.versions?.webcontainer

if (!SB)
  throw new Error('This is not an StackBlitz web container!')

updateProjectStructure()

/** @type {Record<string, string>} */
const pnpmCatalogs = {
  '@antfu/eslint-config': '^4.12.0',
  '@antfu/ni': '^24.3.0',
  '@arethetypeswrong/cli': '^0.17.4',
  '@mdi/font': '7.4.47',
  '@nuxt/fonts': '^0.11.1',
  '@nuxt/module-builder': '^1.0.1',
  '@nuxt/schema': '^3.16.2',
  '@tsconfig/node22': '^22.0.0',
  '@types/node': '^22.14.1',
  '@vitejs/plugin-vue': '^5.2.3',
  '@vue/tsconfig': '^0.7.0',
  'bumpp': '^10.1.0',
  'eslint': '^9.24.0',
  'nuxt': '3.16.2',
  'pathe': '^2.0.3',
  'read-yaml-file': '^2.1.0',
  'sass-embedded': '^1.86.3',
  'taze': '^19.0.2',
  'tsx': '^4.19.3',
  'typescript': '~5.8.3',
  'unbuild': '^3.5.0',
  'unimport': '^5.0.0',
  'unplugin-auto-import': '^19.1.2',
  'unplugin-fonts': '^1.3.1',
  'unplugin-vue-components': '^28.4.1',
  'upath': '^2.0.1',
  'vite': '6.2.6',
  'vite-plugin-inspect': '^11.0.0',
  'vue': '^3.5.13',
  'vue-tsc': '^2.2.8',
  'vuetify': '^3.8.1',
}

/** @param path {string} */
async function disableNuxtFonts(path) {
  let content = await fsPromises.readFile(path, { encoding: 'utf-8' })
  content = content.replace(
    '  modules: [\'@nuxt/fonts\'],',
    `  // disabled at SB: check https://github.com/nuxt/fonts/issues/438#issuecomment-2560376071
  // modules: ['@nuxt/fonts'],`,
  )

  await fsPromises.writeFile(path, content, 'utf-8')
}

/** @param path {string} */
async function overrideNuxtSettings(path) {
  const template = `$font: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', Arial, sans-serif;

@use 'vuetify/settings' with (
  $body-font-family: $font
);
`
  await fsPromises.writeFile(path, template, 'utf-8')
}

/** @param path {string} */
async function replaceDependencies(path) {
  const packageJson = JSON.parse(await fsPromises.readFile(path, { encoding: 'utf8' }))
  for (const key of ['peerDependencies', 'devDependencies', 'dependencies', 'resolutions']) {
    const entry = packageJson[key]
    if (entry) {
      packageJson[key] = Array.from(Object.entries(
        /** @type {Record<string, string>} */
        entry,
      )).reduce((acc, [key, value]) => {
        acc[key] = value === 'catalog:' ? pnpmCatalogs[key] || value : value
        return acc
      }, {})
    }
  }

  await fsPromises.writeFile(path, JSON.stringify(packageJson, null, 2), 'utf-8')
}

async function updateProjectStructure() {
  const root = resolve('./package.json')
  const packageJson = JSON.parse(await fsPromises.readFile(root, { encoding: 'utf-8' }))
  packageJson.pnpm = {
    patchedDependencies: {
      'nuxt@3.16.2': 'patches/nuxt@3.16.2.patch',
      'unimport@4.2.0': 'patches/unimport@4.2.0.patch',
    },
    overrides: {
      'sass-embedded': 'npm:sass@1.86.3',
    },
  }
  await fsPromises.writeFile(root, JSON.stringify(packageJson, null, 2), 'utf-8')
  await fsPromises.writeFile(
    './engines.node',
    `{

      "name": "@unvuetify/monorepo",
      "version": "${packageJson.version}",
      "engines": {
        "node": "20.19.0"
      }
    }`,
    'utf-8',
  )

  await Promise.all([
    // replace pnpm catalog: dependencies
    replaceDependencies(resolve('./package.json')),
    replaceDependencies(resolve('./packages/nuxt-utils/package.json')),
    replaceDependencies(resolve('./packages/shared/package.json')),
    replaceDependencies(resolve('./packages/styles-plugin/package.json')),
    replaceDependencies(resolve('./packages/unimport-presets/package.json')),
    replaceDependencies(resolve('./packages/unplugin-vue-components-resolvers/package.json')),
    replaceDependencies(resolve('./playgrounds/basic-nuxt/package.json')),
    replaceDependencies(resolve('./playgrounds/basic-resolvers/package.json')),
    replaceDependencies(resolve('./playgrounds/basic-unimport/package.json')),
    replaceDependencies(resolve('./playgrounds/prefix-nuxt/package.json')),
    replaceDependencies(resolve('./playgrounds/prefix-resolvers/package.json')),
    replaceDependencies(resolve('./playgrounds/prefix-unimport/package.json')),
    // disable nuxt fonts module
    disableNuxtFonts(resolve('./playgrounds/basic-nuxt/nuxt.config.ts')),
    disableNuxtFonts(resolve('./playgrounds/prefix-nuxt/nuxt.config.ts')),
    // override nuxt settings.scss
    overrideNuxtSettings(resolve('./playgrounds/prefix-nuxt/app/assets/settings.scss')),
    overrideNuxtSettings(resolve('./playgrounds/basic-nuxt/app/assets/settings.scss')),
  ])

  await Promise.all([
    fsPromises.rm('./pnpm-lock.yaml', { force: true }),
    fsPromises.rm('./pnpm-workspace.yaml', { force: true }),
  ])

  await fsPromises.writeFile(
    './pnpm-workspace.yaml',
    `packages:
  - packages/**
  - playgrounds/**
`,
    'utf-8',
  )
}
