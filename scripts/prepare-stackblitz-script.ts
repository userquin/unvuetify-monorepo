import { lstat, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import readYamlFile from 'read-yaml-file'

createStackblitzScript()

interface PnpmWorkspaceYaml {
  catalog?: Record<string, string>
  catalogs?: Record<string, Record<string, string>>
}

async function createStackblitzScript() {
  const rootDir = process.cwd()
  const script = resolve(rootDir, '.stackblitz.js')
  const isFile = await lstat(script).then(stat => stat.isFile())
  if (!isFile)
    throw new Error('Run this script from root folder!')

  const yaml: PnpmWorkspaceYaml = await readYamlFile(resolve(rootDir, 'pnpm-workspace.yaml'))
  const dependencies
    = JSON
      .stringify(yaml.catalog ?? {}, null, 2)
      .replace(/"/g, '\'')
      // add trailing comma in the last dependency entry
      .replace(/'\s+\}/, '\',\n}')

  const sbScript = `import fsPromises from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

const SB = process?.env?.SHELL === '/bin/jsh' && process?.versions?.webcontainer

if (!SB)
  throw new Error('This is not an StackBlitz web container!')

updateProjectStructure()

/** @type {Record<string, string>} */
const pnpmCatalogs = ${dependencies}

/** @param path {string} */
async function disableNuxtFonts(path) {
  let content = await fsPromises.readFile(path, { encoding: 'utf-8' })
  content = content.replace(
    '  modules: [\\'@nuxt/fonts\\'],',
    \`  // disabled at SB: check https://github.com/nuxt/fonts/issues/438#issuecomment-2560376071
  // modules: ['@nuxt/fonts'],\`,
  )

  await fsPromises.writeFile(path, content, 'utf-8')
}

/** @param path {string} */
async function overrideNuxtSettings(path) {
  const template = \`$font: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', Arial, sans-serif;

@use 'vuetify/settings' with (
  $body-font-family: $font
);
\`
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
      'unimport@5.0.0': 'patches/unimport@5.0.0.patch',
    },
    overrides: {
      'sass-embedded': 'npm:sass@1.86.3',
    },
  }
  await fsPromises.writeFile(root, JSON.stringify(packageJson, null, 2), 'utf-8')
  await fsPromises.writeFile(
    './engines.node',
    \`{

      "name": "@unvuetify/monorepo",
      "version": "\${packageJson.version}",
      "engines": {
        "node": "20.19.0"
      }
    }\`,
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
    overrideNuxtSettings(resolve('./playgrounds/basic-nuxt/app/assets/settings.scss')),
    overrideNuxtSettings(resolve('./playgrounds/prefix-nuxt/app/assets/settings.scss')),
  ])

  await Promise.all([
    fsPromises.rm('./pnpm-lock.yaml', { force: true }),
    fsPromises.rm('./pnpm-workspace.yaml', { force: true }),
  ])

  await fsPromises.writeFile(
    './pnpm-workspace.yaml',
    \`packages:
  - packages/**
  - playgrounds/**
\`,
    'utf-8',
  )
}
`
  await writeFile(script, sbScript, 'utf-8')
}
