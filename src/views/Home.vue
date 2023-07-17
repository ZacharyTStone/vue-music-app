<template>
  <main>
    <!-- Introduction -->
    <base-button></base-button>

    <section class="mb-8 py-10 text-white text-center relative">
      <div>
        <div
          class="absolute inset-0 w-full introduction-bg banner h-auto"
          style="background-image: url(assets/img/header.png)"
        ></div>
      </div>
    </section>
    <div class="mb-8 py-10 text-white text-center relative">
      <div class="text-green-500 main-header-content">
        <!-- Introducting Heading -->
        <h1 class="font-bold text-5xl mb-5">
          {{ $t("home.listen") }}
        </h1>
        <p class="w-full md:w-8/12 mx-auto">
          {{ $t("home.about") }}
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <SongTypePanel />
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{
            icon: 'headphones-alt',
            right: true,
            active: true,
          }"
        >
          <span class="card-title">{{ $t("home.songs") }}</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <!-- only create the song time if the song's type is the same as the current states current song type-->
        <ol id="playlist">
          <app-song-item
            v-for="song in filteredSongs"
            :song="song"
            :key="song.id"
          />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";
import { songsCollection } from "@/utils/firebase";
import AppSongItem from "@/components/AppSongItem.vue";
import IconSecondary from "@/directives/icon-secondary";
import SongTypePanel from "../components/SongTypePanel.vue";

export default {
  name: "Home",
  components: {
    AppSongItem,
    SongTypePanel,
  },
  directives: {
    "icon-secondary": IconSecondary,
  },

  data() {
    return {
      songs: [],
      maxPerPage: 25,
      pendingRequest: false,
    };
  },

  computed: {
    ...mapState({
      currentSongType: (state) => state.currentSongType,
    }),
    filteredSongs() {
      return this.songs.filter(
        (song) =>
          song.type === this.currentSongType || this.currentSongType === "all"
      );
    },
  },

  async created() {
    this.getSongs();

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let snapshots;

      if (this.songs.length) {
        const lastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].docID)
          .get();
        snapshots = await songsCollection
          .orderBy("modified_name")
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy("modified_name")
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });

      this.pendingRequest = false;
    },
  },
};
</script>

<style scoped>
.banner {
  height: 130px;
}
</style>
