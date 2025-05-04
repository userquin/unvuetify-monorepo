import fsPromises from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

const SB = process?.env?.SHELL === '/bin/jsh' && process?.versions?.webcontainer

if (!SB)
  throw new Error('This is not an StackBlitz web container!')

updateProjectStructure()

const nuxt = true
/** @type {Record<string, string>} */
const extraDependencies = undefined
/** @type {Record<string, string>} */
const extraDevDependencies = undefined
/** @type {Record<string, string>} */
const pnpmCatalogs = {
  '@antfu/eslint-config': '^4.12.0',
  '@antfu/ni': '^24.3.0',
  '@arethetypeswrong/cli': '^0.17.4',
  '@mdi/font': '7.4.47',
  '@nuxt/fonts': '^0.11.1',
  '@nuxt/module-builder': '^1.0.1',
  '@nuxt/schema': '^3.17.1',
  '@nuxtjs/i18n': '^9.5.4',
  '@tsconfig/node22': '^22.0.0',
  '@types/node': '^22.14.1',
  '@vitejs/plugin-vue': '^5.2.3',
  '@vue/tsconfig': '^0.7.0',
  'bumpp': '^10.1.0',
  'eslint': '^9.24.0',
  'nuxt': '3.17.1',
  'pathe': '^2.0.3',
  'read-yaml-file': '^2.1.0',
  'sass-embedded': '^1.86.3',
  'taze': '^19.0.2',
  'tsx': '^4.19.3',
  'typescript': '~5.8.3',
  'unbuild': '^3.5.0',
  'unimport': '^5.0.1',
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
async function disableNuxtFonts() {
  const path = './nuxt.config.ts'
  let content = await fsPromises.readFile(path, { encoding: 'utf-8' })
  content = content.replace(
    '  modules: [\'@nuxt/fonts\'],',
    `  // disabled at SB: check https://github.com/nuxt/fonts/issues/438#issuecomment-2560376071
  // modules: ['@nuxt/fonts'],`,
  )

  await fsPromises.writeFile(path, content, 'utf-8')
}
async function overrideNuxtSettings() {
  const path = './app/assets/settings.scss'
  const template = `$font: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', Arial, sans-serif;

@use 'vuetify/settings' with (
  $body-font-family: $font
);
`
  await fsPromises.writeFile(path, template, 'utf-8')
}

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
    `{

      "name": "prefix-nuxt",
      "version": "${packageJson.version}",
      "engines": {
        "node": "20.19.0"
      }
    }`,
    'utf-8',
  )
  await Promise.all([disableNuxtFonts(), overrideNuxtSettings()])
}
