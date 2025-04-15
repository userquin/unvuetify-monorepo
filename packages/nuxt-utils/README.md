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

If you just want to auto-import Vuetify components, composables and directives in your Nuxt 3 app, you can use the `configureVuetify` in a new module, create the following module in your Nuxt modules folder:

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

then, run the `nuxt prepare` command and add the options to your `nuxt.config.ts` using the `vuetify` key:

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
- [basic-nuxt](../../playgrounds/basic-nuxt)
- [prefix-nuxt](../../playgrounds/prefix-nuxt)

## 📄 License

[MIT](./LICENSE) License &copy; 2025-PRESENT [Joaquín Sánchez](https://github.com/userquin)
