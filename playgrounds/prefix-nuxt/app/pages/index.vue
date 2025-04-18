<script setup lang="ts">
const theme = useVTheme()

const clicks = ref(0)
function onClick() {
  clicks.value = clicks.value + 1
}
function onHydrated() {
  // eslint-disable-next-line no-console
  console.log('Hydrated')
}

// eslint-disable-next-line no-console
console.log(`Using dark theme? ${theme.global.name.value === 'dark'}`)
</script>

<template>
  <vuetify-container class="fill-height" max-width="900">
    <vuetify-row justify="center">
      <vuetify-col>
        <vuetify-img
          class="mb-4"
          height="150"
          src="~/assets/logo.png"
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
              class="py-4 px-2"
              color="surface-variant"
              image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
              prepend-icon="mdi-rocket-launch-outline"
              rounded="lg"
              variant="tonal"
            >
              <template #title>
                <h2 class="text-h5 font-weight-bold">
                  Nuxt Auto-Import with Prefixes
                </h2>
              </template>
            </vuetify-card>
          </vuetify-col>
          <vuetify-col cols="12">
            <vuetify-card
              v-vuetify-click-outside="{ handler: onClick }"
              class="py-4 px-2"
              color="surface-variant"
              rounded="lg"
              variant="tonal"
            >
              <template #actions>
                Click outside the card: {{ clicks }}
                <vuetify-btn @click="onClick">
                  Click me
                </vuetify-btn>
                <lazy-vuetify-btn :hydrate-after="2000" @hydrated="onHydrated" @click="onClick">
                  Click me
                </lazy-vuetify-btn>
              </template>
            </vuetify-card>
          </vuetify-col>
        </vuetify-row>
      </vuetify-col>
    </vuetify-row>
  </vuetify-container>
</template>
