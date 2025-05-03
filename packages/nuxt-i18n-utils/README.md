<br>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/userquin/unvuetify-monorepo/blob/main/vuetify-logo-dark-atom.svg" height="100px" />
    <img height="100px" src="https://github.com/userquin/unvuetify-monorepo/blob/main/vuetify-logo-light-atom.svg">
  </picture>
</p>

<h1 align="center">@unvuetify/nuxt-i18n-utils</h1>

<p align="center">
Nuxt 3 I18n utilities.
</p>

<p align='center'>
<a href='https://www.npmjs.com/package/@unvuetify/nuxt-i18n-utils' target="__blank">
  <img src='https://img.shields.io/npm/v/@unvuetify/nuxt-i18n-utils.svg?style=flat&colorA=18181B&colorB=1867C0' alt="NPM version">
</a>
<a href="https://npm.chart.dev/@unvuetify/nuxt-i18n-utils" target="__blank">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@unvuetify/nuxt-i18n-utils.svg?style=flat&colorA=18181B&colorB=1867C0">
</a>
<a href="https://github.com/userquin/unvuetify-monorepo/tree/main/LICENSE" target="__blank">
  <img alt="MIT LICENSE" src="https://img.shields.io/npm/l/@unvuetify/nuxt-i18n-utils.svg?style=flat&colorA=18181B&colorB=1867C0">
</a>
</p>

## 📦 Install

```bash
# pnpm
pnpm add @unvuetify/nuxt-i18n-utils

# npm
npm i @unvuetify/nuxt-i18n-utils

# yarn
yarn add @unvuetify/nuxt-i18n-utils

# bun
bun add @unvuetify/nuxt-i18n-utils
```

## 🦄 Usage

We suggest you to use [vuetify-nuxt-module](https://nuxt.vuetifyjs.com/), there are a lot of options to configure Vuetify including SSR support and [HTTP Client Hints](https://nuxt.vuetifyjs.com/guide/server-side-rendering.html#server-side-rendering-ssr).

If you just want to use Vuetify with `@nuxtjs/i18n`, you can use the `configureI18n` function in a new module, create the following module in your Nuxt modules folder:

```ts
// modules/vuetify.ts
import type { VuetifyNuxtOptions } from '@unvuetify/nuxt-utils'
import { defineNuxtModule } from '@nuxt/kit'
import { configureI18n } from '@unvuetify/nuxt-i18n-utils'
import { configureVuetify } from '@unvuetify/nuxt-utils'

export interface ModuleOptions extends VuetifyNuxtOptions {
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vuetify:nuxt-module',
    configKey: 'vuetify',
    compatibility: {
      nuxt: '>=3.0.0',
    },
    default: {},
  },
  setup(options, nuxt) {
    configureVuetify(nuxt, options)
    configureI18n(nuxt)
  },
})
```

then, run the `nuxt/nuxi prepare` command and add the options to your `nuxt.config.ts` using the `vuetify` key:

```ts
// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    /* i18n options */
  },
  /* other nuxt options */
  vuetify: {
    composables: { /* composables options */ },
    components: { /* components options */ },
    directives: { /* directives options */ },
    styles: { /* styles options */ }
  }
})
```

and finally, you also need to add a Nuxt plugin to register the Vuetify plugin:

```ts
// plugins/vuetify.ts
import type { VuetifyOptions } from 'vuetify'
import { configureVuetifyI18nAdapter } from '@unvuetify/nuxt-i18n-utils/runtime'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    theme: {
      defaultTheme: 'dark',
    },
  } satisfies VuetifyOptions
  configureVuetifyI18nAdapter(options)
  const vuetify = createVuetify(options)
  nuxtApp.vueApp.use(vuetify)
})
```

Check the `nuxt-i18n` playground:
- [nuxt-i18n](https://github.com/userquin/unvuetify-monorepo/tree/main/playgrounds/nuxt-i18n)

## 📄 License

[MIT](https://github.com/userquin/unvuetify-monorepo/blob/main/LICENSE) License &copy; 2025-PRESENT [Joaquín Sánchez](https://github.com/userquin)
