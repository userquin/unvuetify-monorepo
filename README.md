<br>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/userquin/unvuetify-monorepo/blob/main/vuetify-logo-dark-atom.svg" height="100px" />
    <img height="100px" src="https://github.com/userquin/unvuetify-monorepo/blob/main/vuetify-logo-light-atom.svg">
  </picture>
</p>

<h1 align="center">@unvuetify</h1>

<p align="center">
Unified Vuetify utilities.
</p>

## 🚨 Motivation

This monorepo has been created due to the existing limitations when using `vite-plugin-vuetify/webpack-plugin-vuetify` and the new features added in Vue 3.5 and Nuxt 3.16: [Vue Lazy Hydration](https://blog.vuejs.org/posts/vue-3-5#lazy-hydration) and [Nuxt 3](https://nuxt.com/blog/v3-16#%EF%B8%8F-delayed-hydration-support). Check the [comparison table](#-package-features-comparison) for more details.

`@unvuetify` is an alternative to `vite-plugin-vuetify`, you can still use `vite-plugin-vuetify` or `webpack-plugin-vuetify`: the packages in this monorepo have been created to provide support for Vite and Nuxt 3 applications, and to provide a more flexible and extensible API via [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) and [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)/[unimport](https://github.com/unjs/unimport).

## 🚀 Features

- 👌 **ESM-only** packages
- ⚡ **Fully Tree Shakable**: use [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) resolvers or [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) presets and only used Vuetify composables, components and directives will be included in the final bundle
- 💥 **Vue Lazy Hydration support**: ready to use [Vue Lazy Hydration](https://blog.vuejs.org/posts/vue-3-5#lazy-hydration) with Vuetify components and [Nuxt 3](https://nuxt.com/blog/v3-16#%EF%B8%8F-delayed-hydration-support)
- 🔌 **Extensible**: allow prefixing Vuetify components, directives and composables with `Vuetify` prefix
- ✨ **VSCode directives** suggestions
- ⚙️ **Nuxt 3/4 utilities**: drop a simple Nuxt module and it will auto-import all Vuetify components, directives and composables for you
- 🦾 **Type Strong**: written in [TypeScript](https://www.typescriptlang.org/)

## 🛠️ Packages

- [@unvuetify/shared](./packages/shared): utilities to resolve Vuetify components and directives
- [@unvuetify/unimport-presets](./packages/unimport-presets): presets to auto-import Vuetify composables and directives
- [@unvuetify/unplugin-vue-components-resolvers](./packages/unplugin-vue-components-resolvers): resolvers to auto-import Vuetify components and directives
- [@unvuetify/vite-plugin-styles](./packages/styles-plugin): Vite plugin to load Vuetify sass/scss styles with Nuxt 3 SSR support
- [@unvuetify/nuxt-utils](./packages/nuxt-utils): utilities to configure Vuetify composables, directives, components and sass/scss styles in your Nuxt 3 application

## 🦄 Usage

There are a lot of packages/modules in this repository, our suggestion is to use the following packages when using:
- Vite:
  - `@unvuetify/unimport-presets` for composables and directives presets via `unplugin-auto-import`
  - `@unvuetify/unplugin-vue-components-resolvers` resolvers for components via `unplugin-vue-components`
  - `@unvuetify/vite-plugin-styles` for styles
- Nuxt:
  - [vuetify-nuxt-module](https://nuxt.vuetifyjs.com/) for all Vuetify features
- Nuxt basic (check [nuxt-utils usage](./packages/nuxt-utils/README.md#-usage)):
  - `@unvuetify/nuxt-utils` via Nuxt module using `configureVuetify` function

Check the playgrounds for further details:
- [basic-nuxt](./playgrounds/basic-nuxt)
- [basic-resolvers](./playgrounds/basic-resolvers)
- [basic-unimport](./playgrounds/basic-unimport)
- [prefix-nuxt](./playgrounds/prefix-nuxt)
- [prefix-resolvers](./playgrounds/prefix-resolvers)
- [prefix-unimport](./playgrounds/prefix-unimport)

## 👀 Package features comparison

> [!NOTE]
> `unimport` requires a patch to support prefixing Vuetify directives in Nuxt, should be fixed in next `v4/v5` releases: check https://github.com/unjs/unimport/pull/447.

> [!NOTE]
> Nuxt 3.16.2 requires a patch to support Vue Lazy Hydration, should be fixed in 3.17.0: check https://github.com/nuxt/nuxt/pull/31649.

Feature / Package | vite-plugin-vuetify | webpack-plugin-vuetify | styles[^1] | resolvers[^2] | presets[^3] | Nuxt[^4] |
----------------|---------------------|------------------------|-----------------------|---------------|-------------|----------
auto-import composables | ❌                   | ❌                      | ❌                     | ✅             | ✅           | ✅
auto-import components | ✅                   | ✅                      | ❌                     | ✅             | ✅[^5]       | ✅
auto-import directives | ✅                   | ✅                      | ❌                     | ✅             | ✅           | ✅
auto-import labs components | ✅                   | ✅                      | ❌                     | ✅             | ✅           | ✅
sass/scss variables | ✅                   | ✅                      | ✅                     | ❌             | ❌           | ✅
sass/scss variables with Vite/Nuxt 3 SSR | ✅[^6]               | ❓[^7]                  | ✅                     | ❌             | ❌           | ✅
prefix composables, directives and components | ❌                   | ❌                      | ❌                     | ✅             | ✅           | ✅
Nuxt Lazy Hydration | ❌                   | ❌                      | ❌                     | ❌             | ✅[^8]       | ✅
VSCode directives suggestions | ❌                   | ❌                      | ❌                     | ❌             | ✅           | ✅

[^1]: `@unvuetify/vite-plugin-styles`
[^2]: `@unvuetify/unplugin-vue-components-resolvers`
[^3]: `@unvuetify/unimport-presets`
[^4]: `vuetify-nuxt-module` will support all the features once updated using the packages in this monorepo
  `@unvuetify/nuxt-utils` supports all the features, but it is not a drop-in replacement for `vuetify-nuxt-module`
[^5]: `@unvuetify/unimport-presets` components preset can be used with Nuxt components loader, won't work with Vite
[^6]: `vite-plugin-vuetify` will work, but we can get some warnings about missing sources
[^7]: `webpack-plugin-vuetify` not tested with Nuxt 3 with or without SSR
[^8]: `@unvuetify/unimport-presets` components preset can be used with Nuxt imports

## 📄 License

[MIT](./LICENSE) License &copy; 2025-PRESENT [Joaquín Sánchez](https://github.com/userquin)
