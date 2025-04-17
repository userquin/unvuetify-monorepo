<br>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/userquin/unvuetify-monorepo/blob/main/vuetify-logo-dark-atom.svg" height="100px" />
    <img height="100px" src="https://github.com/userquin/unvuetify-monorepo/blob/main/vuetify-logo-light-atom.svg">
  </picture>
</p>

<h1 align="center">@unvuetify/nuxt-utils</h1>

<p align="center">
Nuxt 3 utilities for Vuetify.
</p>

<p align='center'>
<a href='https://www.npmjs.com/package/@unvuetify/nuxt-utils' target="__blank" style="text-decoration: none;">
  <img src='https://img.shields.io/npm/v/@unvuetify/nuxt-utils.svg?style=flat&colorA=18181B&colorB=1867C0' alt="NPM version">
</a>
<a href="https://npm.chart.dev/@unvuetify/nuxt-utils" target="__blank">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@unvuetify/nuxt-utils.svg?style=flat&colorA=18181B&colorB=1867C0">
</a>
<a href="https://github.com/userquin/unvuetify-monorepo/tree/main/LICENSE" target="__blank">
  <img alt="MIT LICENSE" src="https://img.shields.io/npm/l/@nuxt/fonts.svg?style=flat&colorA=18181B&colorB=1867C0">
</a>
<a href="https://nuxt.com" target="__blank">
  <img alt="Nuxt" src="https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js">
</a>
</p>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

## 📦 Install

```bash
# pnpm
pnpm add @unvuetify/nuxt-utils

# npm
npm i @unvuetify/nuxt-utils

# yarn
yarn add @unvuetify/nuxt-utils

# bun
bun add @unvuetify/nuxt-utils
```

## 🦄 Usage

We suggest you to use [vuetify-nuxt-module](https://nuxt.vuetifyjs.com/), there are a lot of options to configure Vuetify including SSR support and [HTTP Client Hints](https://nuxt.vuetifyjs.com/guide/server-side-rendering.html#server-side-rendering-ssr).

If you just want to auto-import Vuetify components, composables and directives and use sass/scss variables in your Nuxt 3 app, you can use the `configureVuetify` in a new module, create the following module in your Nuxt modules folder:

```ts
// modules/vuetify.ts
import type { VuetifyNuxtOptions } from '@unvuetify/nuxt-utils'
import { defineNuxtModule } from '@nuxt/kit'
import { configureVuetify } from '@unvuetify/nuxt-utils'

export interface ModuleOptions extends VuetifyNuxtOptions {
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vuetify:nuxt-module',
    configKey: 'vuetify',
    compatibility: {
      nuxt: '^3.0.0',
    },
    default: {},
  },
  setup(options, nuxt) {
    configureVuetify(nuxt, options)
  },
})
```

then, run the `nuxt/nuxi prepare` command and add the options to your `nuxt.config.ts` using the `vuetify` key:

```ts
// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /* other nuxt options */
  vuetify: {
    composables: { /* composables options */ },
    components: { /* components options */ },
    directives: { /* directives options */ },
    styles: { /* styles options */ }
  }
})
```

Check the `nuxt` playgrounds:
- [basic-nuxt](https://github.com/userquin/unvuetify-monorepo/tree/main/playgrounds/basic-nuxt)
- [prefix-nuxt](https://github.com/userquin/unvuetify-monorepo/tree/main/playgrounds/prefix-nuxt)

## 📄 License

[MIT](https://github.com/userquin/unvuetify-monorepo/blob/main/LICENSE) License &copy; 2025-PRESENT [Joaquín Sánchez](https://github.com/userquin)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@unvuetify/nuxt-utils/latest.svg?style=flat&colorA=18181B&colorB=1867C0
[npm-version-href]: https://www.npmjs.com/package/@unvuetify/nuxt-utils

[npm-downloads-src]: https://img.shields.io/npm/dm/@unvuetify/nuxt-utils.svg?style=flat&colorA=18181B&colorB=1867C0
[npm-downloads-href]: https://npm.chart.dev/@unvuetify/nuxt-utils

[license-src]: https://img.shields.io/npm/l/@nuxt/fonts.svg?style=flat&colorA=18181B&colorB=1867C0
[license-href]: https://github.com/userquin/unvuetify-monorepo/tree/main/LICENSE

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
