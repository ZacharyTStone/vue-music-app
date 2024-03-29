<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t("profile.my_songs") }}</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t("profile.my_comments") }}</span>
            <i class="fa fa-comment float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <div v-for="(comment, i) in comments" :key="i">
              <span>
                {{ comment.song_name }} : {{ comment.content }} -
                {{ comment.datePosted }}
              </span>

              <button
                class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                @click.prevent="removeComment(comment)"
              >
                <i class="fa fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from '@/store';
import AppUpload from "@/components/Upload.vue";
import CompositionItem from "@/components/CompositionItem.vue";
import { songsCollection, commentsCollection, auth } from "@/utils/firebase";

export default {
  name: "profile",
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      comments: [],
      unsavedFlag: false,
    };
  },
  async created() {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();

    snapshot.forEach(this.addSong);

    const commentsSnapshot = await commentsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();

    commentsSnapshot.forEach(this.addComment);
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
      this.songs[i].instrument = values.instrument;
      this.songs[i].type = values.type;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };

      this.songs.push(song);
    },

    addComment(document) {
      const comment = {
        ...document.data(),
        docID: document.id,
      };

      this.comments.push(comment);
    },

    async removeComment(comment) {
      if (confirm("do you want to delete this comment?")) {
        if (comment.uid === auth.currentUser.uid) {
          const songSnapshot = await songsCollection.doc(comment.sid).get();
          const song = {
            ...songSnapshot.data(),
            docID: songSnapshot.id,
          };

          song.comment_count -= 1;

          await songsCollection.doc(song.docID).set(song);

          // remove comment

          commentsCollection.doc(comment.docID).delete();

          // remove comment from comments array

          const index = this.comments.indexOf(comment);

          this.comments.splice(index, 1);
        }
      }
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      next(leave);
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'home' });
  //   }
  // },
};
</script>

<style scoped></style>
