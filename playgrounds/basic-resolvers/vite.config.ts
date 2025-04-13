import { VuetifyVueResolver } from '@unvuetify/unplugin-vue-components-resolvers'
import Vue from '@vitejs/plugin-vue'
import ViteFonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

const {
  transformAssetUrls,
  VuetifyDirectiveResolver,
  VuetifyComponentResolver,
} = VuetifyVueResolver()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    Components({
      dts: 'src/components.d.ts',
      directives: true,
      resolvers: [
        VuetifyDirectiveResolver,
        VuetifyComponentResolver,
      ],
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
