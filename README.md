<br>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/userquin/unvuetify-monorepo/blob/main/vuetify-logo-dark-atom.svg" height="100px" />
    <img height="100px" src="https://github.com/userquin/unvuetify-monorepo/blob/main/vuetify-logo-light-atom.svg">
  </picture>
</p>

<h1 align="center">@unvuetify</h1>

<p align="center">
Unified Vuetify utilities for Vite and Nuxt.
</p>

<p align='center'>
<a href="https://github.com/userquin/unvuetify-monorepo/tree/main/LICENSE" target="__blank">
  <img alt="MIT LICENSE" src="https://img.shields.io/npm/l/@unvuetify/unimport-presets.svg?style=flat&colorA=18181B&colorB=1867C0">
</a>
<br>
<a href="https://github.com/userquin/unvuetify-monorepo" target="__blank">
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/userquin/unvuetify-monorepo?style=social">
</a>
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
- ⚙️ **Nuxt utilities**: drop a simple Nuxt module and it will auto-import all Vuetify components, directives and composables for you
- 🌍 **Nuxt I18n utilities**: install [@nuxtjs/i18n](https://github.com/nuxt-modules/i18n) Nuxt module, drop a simple module to configure Vuetify with i18n support
- 🦾 **Type Strong**: written in [TypeScript](https://www.typescriptlang.org/)

## 🛠️ Packages

- [@unvuetify/shared](./packages/shared): utilities to resolve Vuetify components and directives
- [@unvuetify/unimport-presets](./packages/unimport-presets): presets to auto-import Vuetify composables and directives
- [@unvuetify/unplugin-vue-components-resolvers](./packages/unplugin-vue-components-resolvers): resolvers to auto-import Vuetify components and directives
- [@unvuetify/vite-styles-plugin](./packages/styles-plugin): Vite plugin to load Vuetify sass/scss styles with Nuxt 3 SSR support
- [@unvuetify/nuxt-utils](./packages/nuxt-utils): utilities to configure Vuetify composables, directives, components and sass/scss styles in your Nuxt 3 application
- [@unvuetify/nuxt-i18n-utils](./packages/nuxt-i18n-utils): utilities to configure Vuetify with [@nuxtjs/i18n](https://github.com/nuxt-modules/i18n) in your Nuxt application

## 🦄 Usage

There are a lot of packages/modules in this repository, our suggestion is to use the following packages when using:
- Vite:
  - `@unvuetify/unimport-presets` for composables and directives presets via `unplugin-auto-import`
  - `@unvuetify/unplugin-vue-components-resolvers` resolvers for components via `unplugin-vue-components`
  - `@unvuetify/vite-styles-plugin` for styles
- Nuxt:
  - [vuetify-nuxt-module](https://nuxt.vuetifyjs.com/) for all Vuetify features
- Nuxt basic (check [nuxt-utils usage](./packages/nuxt-utils/README.md#-usage)):
  - `@unvuetify/nuxt-utils` via Nuxt module using `configureVuetify` function
- Nuxt basic i18n (check [nuxt-utils usage](./packages/nuxt-utils/README.md#-usage) and [nuxt-i18n-utils usage](./packages/nuxt-i18n-utils/README.md#-usage)):
  - `@unvuetify/nuxt-utils` via Nuxt module using `configureVuetify` function
  - `@unvuetify/nuxt-i18n-utils` via Nuxt module using `configureI18n` function

## 📥 Playgrounds

> [!WARNING]
> `@nuxt/fonts` disabled and `settings.scss` files updated to run Nuxt playgrounds when running at StackBlitz.

You can open `@unvuetify` monorepo in 

![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/userquin/unvuetify-monorepo)

or just play with individual playgrounds:

| Example            | Source                                                                        | Playground |
|--------------------|-------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| `basic-nuxt`       | [GitHub](https://github.com/userquin/unvuetify-monorepo/blob/main/playgrounds/basic-nuxt) | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/userquin/unvuetify-monorepo/blob/main/playgrounds/basic-nuxt) |
| `basic-resolvers`  | [GitHub](https://github.com/userquin/unvuetify-monorepo/blob/main/playgrounds/basic-resolvers) | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/userquin/unvuetify-monorepo/blob/main/playgrounds/basic-resolvers) |
| `basic-unimport`   | [GitHub](https://github.com/userquin/unvuetify-monorepo/blob/main/playgrounds/basic-unimport) | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/userquin/unvuetify-monorepo/blob/main/playgrounds/basic-unimport) |
| `nuxt-i18n`        | [GitHub](https://github.com/userquin/unvuetify-monorepo/blob/main/playgrounds/nuxt-i18n) | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/userquin/unvuetify-monorepo/blob/main/playgrounds/nuxt-i18n) |
| `prefix-nuxt`      | [GitHub](https://github.com/userquin/unvuetify-monorepo/blob/main/playgrounds/prefix-nuxt) | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/userquin/unvuetify-monorepo/blob/main/playgrounds/prefix-nuxt) |
| `prefix-resolvers` | [GitHub](https://github.com/userquin/unvuetify-monorepo/blob/main/playgrounds/prefix-resolvers) | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/userquin/unvuetify-monorepo/blob/main/playgrounds/prefix-resolvers) |
| `prefix-unimport`  | [GitHub](https://github.com/userquin/unvuetify-monorepo/blob/main/playgrounds/prefix-unimport) | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/userquin/unvuetify-monorepo/blob/main/playgrounds/prefix-unimport) |

## 👀 Package features comparison

> [!NOTE]
> `unimport` requires a [patch](https://github.com/userquin/unvuetify-monorepo/blob/main/patches/unimport%404.2.0.patch) to support prefixing Vuetify directives in Nuxt, fixed in `unimport v5.0.1` release: check https://github.com/unjs/unimport/pull/447.

> [!NOTE]
> Nuxt 3.16.2 requires a [patch](https://github.com/userquin/unvuetify-monorepo/blob/main/patches/nuxt%403.16.2.patch) to support Vue Lazy Hydration, fixed in Nuxt 3.17.0: check https://github.com/nuxt/nuxt/pull/31649.

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

[^1]: `@unvuetify/vite-styles-plugin`.
[^2]: `@unvuetify/unplugin-vue-components-resolvers`.
[^3]: `@unvuetify/unimport-presets`.
[^4]: `vuetify-nuxt-module` will support all the features once updated using the packages in this monorepo.<br/>`@unvuetify/nuxt-utils` supports all the features, but it is not a drop-in replacement for `vuetify-nuxt-module`.
[^5]: `@unvuetify/unimport-presets` components utilities can be used with Nuxt components loader, won't work with Vite.
[^6]: `vite-plugin-vuetify` will work, but we can get some warnings about missing sources.
[^7]: `webpack-plugin-vuetify` not tested with Nuxt 3 with or without SSR.
[^8]: `@unvuetify/unimport-presets` components utilities can be used with Nuxt components loader.

## 📄 License

[MIT](./LICENSE) License &copy; 2025-PRESENT [Joaquín Sánchez](https://github.com/userquin)
