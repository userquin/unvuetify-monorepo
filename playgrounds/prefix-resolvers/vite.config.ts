import { VuetifyVueResolver } from '@unvuetify/unplugin-vue-components-resolvers'
import { VuetifyStylesVitePlugin } from '@unvuetify/vite-styles-plugin'
import Vue from '@vitejs/plugin-vue'
import ViteFonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

const {
  transformAssetUrls,
  VuetifyDirectiveResolver,
  VuetifyComponentResolver,
} = VuetifyVueResolver({
  prefixComponents: true,
  prefixDirectives: true,
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    Components({
      dts: true,
      directives: true,
      resolvers: [
        VuetifyDirectiveResolver,
        VuetifyComponentResolver,
      ],
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Poetsen One',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    VuetifyStylesVitePlugin({
      mode: {
        configFile: 'src/styles/settings.scss',
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
