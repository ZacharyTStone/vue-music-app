<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docID } }"
        class="font-bold block text-gray-600"
      >
        {{ song.modified_name }} ( {{ song.genre }} )
        <i
          v-if="this.song.type == 'song'"
          class="fas fa-music text-green-400 text-1xl"
        ></i>
        <i
          v-else-if="this.song.type == 'cover'"
          class="fas fa-compact-disc text-green-400 text-1xl"
        >
        </i>
        <i v-else class="fas fa-puzzle-piece text-green-400 text-1xl"></i>
      </router-link>

      <span class="text-gray-500 text-sm">
        {{ $t("player.by") }}{{ song.display_name }}
      </span>
      <span class="text-gray-500 text-sm"
        >{{ $t("player.on") }} {{ song.instrument }}</span
      >
    </div>

    <div class="text-gray-600 text-lg">
      <router-link
        custom
        v-slot="{ navigate }"
        :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
      >
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.comment_count }}
        </span>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: "AppSongItem",
  props: {
    song: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style></style>
