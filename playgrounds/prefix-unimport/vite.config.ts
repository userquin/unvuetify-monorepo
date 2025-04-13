import {
  VuetifyComposables,
  VuetifyDirectives,
} from '@unvuetify/unimport-presets'
import { VuetifyVueResolver } from '@unvuetify/unplugin-vue-components-resolvers'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import ViteFonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

const {
  transformAssetUrls,
  VuetifyComponentResolver,
} = VuetifyVueResolver({
  prefixComponents: true,
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    Components({
      dts: true,
      resolvers: [
        VuetifyComponentResolver,
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        VuetifyComposables({ prefix: true }),
        VuetifyDirectives({ prefix: true }),
      ],
      vueDirectives: true,
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    Inspect(),
  ],
  optimizeDeps: {
    exclude: [
      'vuetify',
    ],
  },
})
