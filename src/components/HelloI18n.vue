<template>
  <p>{{ $t("hello") }}</p>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n({
  inheritLocale: true,
  useScope: "local",
});
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  }
}
</i18n>
