<script setup lang="ts">
import { ref } from 'vue'

const clicks = ref(0)
function onClick() {
  clicks.value++
}
</script>

<template>
  <vuetify-app>
    <vuetify-main>
      <vuetify-container class="fill-height" max-width="900">
        <vuetify-row justify="center">
          <vuetify-col>
            <vuetify-img
              class="mb-4"
              height="150"
              src="./assets/logo.png"
            />

            <div class="mb-8 text-center">
              <div class="text-body-2 font-weight-light mb-n1">
                Welcome to
              </div>
              <h1 class="text-h2 font-weight-bold">
                Vuetify
              </h1>
            </div>
            <vuetify-row>
              <vuetify-col cols="12">
                <vuetify-card
                  v-vuetify-click-outside="{ handler: onClick }"
                  class="py-4"
                  color="surface-variant"
                  image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
                  prepend-icon="mdi-rocket-launch-outline"
                  rounded="lg"
                  variant="tonal"
                >
                  <template #title>
                    <h2 class="text-h5 font-weight-bold">
                      Vuetify Auto-Import with Resolvers
                    </h2>
                  </template>
                  <template #actions>
                    Click outside the card: {{ clicks }}
                    <vuetify-btn>Click me</vuetify-btn>
                  </template>
                </vuetify-card>
              </vuetify-col>
            </vuetify-row>
          </vuetify-col>
        </vuetify-row>
      </vuetify-container>
    </vuetify-main>
  </vuetify-app>
</template>
