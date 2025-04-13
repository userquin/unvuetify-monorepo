<script setup lang="ts">
const clicks = ref(0)
function onClick() {
  clicks.value++
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <div>
          <v-img
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
          <v-row>
            <v-col cols="12">
              <v-card
                v-click-outside="{ handler: onClick }"
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
                  <v-btn>Click me</v-btn>
                </template>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
