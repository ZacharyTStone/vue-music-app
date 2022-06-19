<template>
  <tapir-widget :time="1" buttonColor="green" audioFormat="MP3" />
</template>

<script>
import TapirWidget from "vue-audio-tapir";
import "vue-audio-tapir/dist/vue-audio-tapir.css";

export default {
  name: "Record",
  components: {
    TapirWidget,
  },
};
</script>
