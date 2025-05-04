export interface PnpmWorkspaceYaml {
  catalog?: Record<string, string>
  catalogs?: Record<string, Record<string, string>>
}

export interface Customizations {
  disableNuxtFonts?: true
  overrideNuxtSettings?: true
  nuxt?: true
  packageJson?: {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }
}
