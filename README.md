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

This monorepo has been created due to the existing limitations when using `vite-plugin-vuetify/webpack-plugin-vuetify` and the new features added in Vue 3.5 and Nuxt 3.16: [Vue Lazy Hydration](https://blog.vuejs.org/posts/vue-3-5#lazy-hydration) and [Nuxt 3](https://nuxt.com/blog/v3-16#%EF%B8%8F-delayed-hydration-support). Check the [comparison table](#package-features-comparison) for more details.

`@unvuetify` is an alternative to `vite-plugin-vuetify`, you can still use `vite-plugin-vuetify` or `webpack-plugin-vuetify`: the packages in this monorepo have been created to provide support for Vite and Nuxt 3 applications, and to provide a more flexible and extensible API via [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) and [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)/[unimport](https://github.com/unjs/unimport).

## 🚀 Features

- 👌 **ESM-only** packages
- ⚡ **Fully Tree Shakable**: use [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) resolvers or [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) presets and only used Vuetify composables, components and directives will be included in the final bundle
- 💥 **Vue Lazy Hydration support**: ready to use [Vue Lazy Hydration](https://blog.vuejs.org/posts/vue-3-5#lazy-hydration) with Vuetify components and [Nuxt 3](https://nuxt.com/blog/v3-16#%EF%B8%8F-delayed-hydration-support)
- 🔌 **Extensible**: allow prefixing Vuetify components, directives and composables with `Vuetify` prefix 
- ✨ **VSCode directives completions**
- 🦾 **Type Strong**: written in [TypeScript](https://www.typescriptlang.org/)

## 🛠️ Packages

- [@unvuetify/shared](./packages/shared): utilities to resolve Vuetify components and directives
- [@unvuetify/vite-plugin-styles](./packages/styles-plugin): Vite plugin to load Vuetify sass/scss styles with Nuxt 3 SSR support
- [@unvuetify/unimport-presets](./packages/unimport-presets): presets to auto-import Vuetify composables and directives
- [@unvuetify/unplugin-vue-components-resolvers](./packages/unplugin-vue-components-resolvers): resolvers to auto-import Vuetify components and directives

## 👀 Package features comparison

Feature / Package | vite-plugin-vuetify | webpack-plugin-vuetify | unplugin-vuetify styles | unplugin-vuetify resolvers | unplugin-vuetify presets | vuetify-nuxt-module[^1] |
----------------|---------------------|------------------------|------------------------|-----------------------|--------------------------|-------------------------
auto-import composables | ❌                   | ❌                      | ❌                      | ✅                     | ✅                        | ✅                       
auto-import components | ✅                   | ✅                      | ❌                      | ✅                     | ✅                        | ✅                       
auto-import directives | ✅                   | ✅                      | ❌                      | ✅                     | ✅                        | ✅                       
auto-import labs components | ✅                   | ✅                      | ❌                      | ✅                     | ✅                        | ✅                       
sass/scss variables | ✅                   | ✅                      | ✅                      | ❌                     | ❌                        | ✅                       
sass/scss variables with Vite/Nuxt 3 SSR | ✅[^2]               | ❌                      | ✅                      | ❌                     | ❌                        | ✅                       
prefix composables, directives and components | ❌                   | ❌                      | ❌                      | ✅                     | ✅                        | ✅                       
Nuxt Lazy Hydration | ❌                   | ❌                      | ❌                      | ❌                     | ✅[^3]                    | ✅                       
VSCode directives suggestions | ❌                   | ❌                      | ❌                      | ✅                     | ✅                        | ✅                       

[^1]: `vuetify-nuxt-module` will support all the features once updated using the packages in this monorepo.
[^2]: will work, but we can get some warning about missing sources.
[^3]: `@unvuetify/unimport-presets` components preset can be used with Nuxt imports.

## 📄 License

[MIT](./LICENSE) License &copy; 2025-PRESENT [Joaquín Sánchez](https://github.com/userquin)
