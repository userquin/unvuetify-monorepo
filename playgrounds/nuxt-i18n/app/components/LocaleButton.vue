<script setup lang="ts">
const { t, current } = useVLocale()
</script>

<template>
  <v-btn>{{ t('$vuetify.badge') }} - {{ current }}</v-btn>
</template>
