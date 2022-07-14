<template>
  <div class="rounded border relative flex">
    <span
      class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
      v-bind:class="{ 'text-green-400': currentSongType == 'all' }"
      @click.prevent="changeCurrentSongType('all')"
    >
      {{ $t("SongTypePanel.all") }}
      <span
        v-icon-secondary="{
          icon: 'headphones-alt',
        }"
      >
      </span>
    </span>
    <span
      class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
      v-bind:class="{ 'text-green-400': currentSongType == 'cover' }"
      @click.prevent="changeCurrentSongType('cover')"
    >
      {{ $t("SongTypePanel.cover") }}
      <span v-icon-secondary="{ icon: 'fas fa-compact-disc ' }"> </span>
    </span>
    <span
      class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
      v-bind:class="{ 'text-green-400': currentSongType == 'idea' }"
      @click.prevent="changeCurrentSongType('idea')"
    >
      {{ $t("SongTypePanel.idea") }}

      <span v-icon-secondary="{ icon: 'fas fa-puzzle-piece' }"> </span>
    </span>
    <span
      class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
      v-bind:class="{ 'text-green-400': currentSongType == 'song' }"
      @click.prevent="changeCurrentSongType('song')"
    >
      {{ $t("SongTypePanel.song") }}

      <span v-icon-secondary="{ icon: 'fas fa-music' }"> </span>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import IconSecondary from "@/directives/icon-secondary";

export default {
  name: "SongTypePanel",
  directives: {
    "icon-secondary": IconSecondary,
  },

  computed: {
    ...mapGetters(["currentSongType"]),
    ...mapState(["currentSongType"]),
  },

  methods: {
    ...mapMutations(["changeCurrentSongType"]),
  },
};
</script>

<style>
.active {
  color: #fff;
  background-color: #007bff;
}

span {
  cursor: pointer;
}
</style>
