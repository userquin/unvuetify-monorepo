<script setup lang="ts">
import LocaleButton from '~/components/LocaleButton.vue'

const { locales, t, locale } = useI18n()
const { current } = useVLocale()
const { isRtl } = useVRtl()

const name = ref('')
const hint = ref('')
const persistentHint = computed(() => hint.value.trim().length > 0)

const dir = computed(() => isRtl.value ? 'rtl' : undefined)
// const dir = computed(() => localeProperties.value.dir)

function onChanged(name?: string) {
  if (name && name.trim().length > 0)
    hint.value = t('say-hi', [name])
  else
    hint.value = ''
}

// don't use current, dir will not be updated
watch([locale, name], ([, nn]) => {
  onChanged(nn)
}, { immediate: true, flush: 'post' })
</script>

<template>
  <v-container fill-height>
    <v-row dense>
      <v-col cols="12">
        <div dir="auto">
          <dl>
            <dt :dir="dir">
              t('$vuetify.badge'):
            </dt><dd :dir="dir">
              {{ t('$vuetify.badge') }}
            </dd>
            <dt :dir="dir">
              t('$vuetify.dataFooter.pageText', [10, 19, 100]):
            </dt><dd :dir="dir">
              {{ t('$vuetify.dataFooter.pageText', [10, 19, 100]) }}
            </dd>
            <dt :dir="dir">
              $t('$vuetify.badge'):
            </dt><dd :dir="dir">
              {{ $t('$vuetify.badge') }}
            </dd>
            <dt :dir="dir">
              $t('$vuetify.dataFooter.pageText', [10, 19, 100]):
            </dt><dd :dir="dir">
              {{ $t('$vuetify.dataFooter.pageText', [10, 19, 100]) }}
            </dd>
          </dl>
        </div>
      </v-col>
      <v-col cols="12">
        <v-locale-provider locale="es">
          <v-btn>{{ t('$vuetify.badge') }}</v-btn>
          <br>
          <LocaleButton />
        </v-locale-provider>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          autofocus
          density="compact"
          clearable
          :placeholder="$t('hi')"
          :hint="hint"
          :persistent-hint="persistentHint"
          @click:clear="() => onChanged('')"
        />
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="current"
          :items="locales"
          density="compact"
          item-title="name"
          item-value="code"
          outlined
          :hint="$t('hi')"
          persistent-hint
        />
      </v-col>
      <v-col cols="6">
        <v-date-picker />
      </v-col>
      <v-col cols="6">
        <v-time-picker />
      </v-col>
    </v-row>
  </v-container>
</template>
