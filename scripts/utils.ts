import type { Customizations } from './types'

const disableNuxtFontsEntry = `
async function disableNuxtFonts() {
  const path = './nuxt.config.ts'
  let content = await fsPromises.readFile(path, { encoding: 'utf-8' })
  content = content.replace(
    '  modules: [\\'@nuxt/fonts\\'],',
    \`  // disabled at SB: check https://github.com/nuxt/fonts/issues/438#issuecomment-2560376071
  // modules: ['@nuxt/fonts'],\`,
  )

  await fsPromises.writeFile(path, content, 'utf-8')
}`

const overrideNuxtSettingsEntry = `
async function overrideNuxtSettings() {
  const path = './app/assets/settings.scss'
  const template = \`$font: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', Arial, sans-serif;

@use 'vuetify/settings' with (
  $body-font-family: $font
);
\`
  await fsPromises.writeFile(path, template, 'utf-8')
}`

function prepareNuxtLogic(disableFonts: boolean, overrideSettings: boolean) {
  if (disableFonts && overrideSettings) {
    return `\n  await Promise.all([disableNuxtFonts(), overrideNuxtSettings()])`
  }

  if (disableFonts) {
    return `\n  await disableNuxtFonts()`
  }

  if (overrideSettings) {
    return `\n  await overrideNuxtSettings()`
  }

  return ''
}

export function prepareStackBlitzExampleContent(
  name: string,
  dependenciesRecord: string,
  customizations?: Customizations,
) {
  const {
    dependencies,
    devDependencies,
  } = customizations?.packageJson || {}
  return `import fsPromises from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

const SB = process?.env?.SHELL === '/bin/jsh' && process?.versions?.webcontainer

if (!SB)
  throw new Error('This is not an StackBlitz web container!')

updateProjectStructure()

/** @type {Record<string, string>} */
const extraDependencies = ${JSON.stringify(dependencies)}
/** @type {Record<string, string>} */
const extraDevDependencies = ${JSON.stringify(devDependencies)}
/** @type {Record<string, string>} */
const pnpmCatalogs = ${dependenciesRecord}${customizations?.disableNuxtFonts ? disableNuxtFontsEntry : ''}${customizations?.overrideNuxtSettings ? overrideNuxtSettingsEntry : ''}

/** @param packageJson {any} */
function replaceDependencies(packageJson) {
  if (extraDependencies) {
    packageJson.dependencies ??= {}
    for (const [p, v] of Object.entries(extraDependencies)) {
      if (!packageJson.dependencies[p]) {
        packageJson.dependencies[p] = v
      }
    }
  }
  if (extraDevDependencies) {
    packageJson.devDependencies ??= {}
    for (const [p, v] of Object.entries(extraDevDependencies)) {
      if (!packageJson.devDependencies[p]) {
        packageJson.devDependencies[p] = v
      }
    }
  }

  for (const key of ['peerDependencies', 'devDependencies', 'dependencies', 'resolutions']) {
    const entry = packageJson[key]
    if (entry) {
      packageJson[key] = Array.from(Object.entries(
        /** @type {Record<string, string>} */
        entry,
      )).reduce((acc, [key, value]) => {
        if (value === 'catalog:') {
          acc[key] = pnpmCatalogs[key] || value
        }
        else if (value === 'workspace:*') {
          acc[key] = 'latest'
        }
        return acc
      }, {})
    }
  }
}

async function updateProjectStructure() {
  const root = resolve('./package.json')
  const packageJson = JSON.parse(await fsPromises.readFile(root, { encoding: 'utf-8' }))
  packageJson.pnpm = {
    overrides: {
      'sass-embedded': 'npm:sass@1.86.3',
    },
  }
  replaceDependencies(packageJson)
  await fsPromises.writeFile(root, JSON.stringify(packageJson, null, 2), 'utf-8')
  await fsPromises.writeFile(
    './engines.node',
    \`{

      "name": "${name}",
      "version": "\${packageJson.version}",
      "engines": {
        "node": "20.19.0"
      }
    }\`,
    'utf-8',
  )${prepareNuxtLogic(customizations?.disableNuxtFonts === true, customizations?.overrideNuxtSettings === true)}
}
`
}
