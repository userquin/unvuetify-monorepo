import type { Customizations } from './types'

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

function prepareNuxtLogic(overrideSettings: boolean) {
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

const nuxt = ${JSON.stringify(customizations?.nuxt)}
/** @type {Record<string, string>} */
const extraDependencies = ${JSON.stringify(dependencies)}
/** @type {Record<string, string>} */
const extraDevDependencies = ${JSON.stringify(devDependencies)}
/** @type {Record<string, string>} */
const pnpmCatalogs = ${dependenciesRecord}${customizations?.overrideNuxtSettings ? overrideNuxtSettingsEntry : ''}

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
        else {
          acc[key] = value
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
  if (nuxt) {
    packageJson.scripts['test:typecheck'] = 'pnpm typecheck'
    delete packageJson.devDependencies['@nuxt/fonts']
    const overrideNuxt = await fsPromises.lstat('./.sb-nuxt.config.ts').then(stat => stat.isFile()).catch(() => false)
    if (overrideNuxt) {
      await fsPromises.rm('./nuxt.config.ts', { force: true })
      await fsPromises.rename('./.sb-nuxt.config.ts', './nuxt.config.ts')
    }
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
  )${prepareNuxtLogic(customizations?.overrideNuxtSettings === true)}
}
`
}
