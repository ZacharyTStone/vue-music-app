<template>
  <!-- Player -->
  <div
    class="fixed bottom-0 left-0 bg-white p-5 pb-4 text-left align-top w-full h-16"
  >
    <div class="relative flex items-center">
      <!-- Play/Pause Button -->
      <div class="w-7 h-7 leading-3">
        <button type="button" @click.prevent="toggleAudio">
          <i
            :class="[
              'fa',
              'text-gray-500',
              'text-xl',
              { 'fa-play': !playing, 'fa-pause': playing },
            ]"
          ></i>
        </button>
      </div>

      <!-- Current Position -->
      <div class="w-14 ml-5 text-gray-400 text-lg">
        <span class="player-currenttime">{{ seek }}</span>
      </div>

      <!-- Scrub -->
      <div class="flex-1 ml-7">
        <div class="relative flex items-center">
          <div
            class="w-full h-2 rounded m-1 mt-2 bg-gray-200 cursor-pointer"
            @click.prevent="updateSeek"
          >
            <span
              class="absolute top-neg-8 text-gray-800 text-lg"
              :style="{ left: playerProgress }"
            >
              <i class="fas fa-circle"></i>
            </span>
            <span
              class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
              :style="{ width: playerProgress }"
            ></span>
          </div>

          <div
            class="ml-2 flex flex-col items-start player-song-info"
            v-if="currentSong.modified_name"
          >
            <span class="song-title"
              >{{ currentSong.modified_name }} ({{ currentSong.genre }})</span
            >
            <span class="text-gray-500 text-sm"
              >{{ $t("player.by")
              }}<span class="song-artist">{{
                currentSong.display_name
              }}</span></span
            >
          </div>
        </div>
      </div>

      <!-- Duration -->
      <div class="w-14 ml-8 text-gray-400 text-lg">
        <span class="player-duration">{{ duration }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Player",
  computed: {
    ...mapGetters(["playing"]),
    ...mapState(["seek", "duration", "playerProgress", "currentSong"]),
  },
  methods: {
    ...mapActions(["toggleAudio", "updateSeek"]),
  },
};
</script>

<style>
@media (max-width: 1000px) {
  .player-song-info {
    display: none;
  }
}
</style>
