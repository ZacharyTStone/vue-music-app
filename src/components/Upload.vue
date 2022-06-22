<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">{{ $t("upload.title") }}</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
      <p>
        <a
          href="https://online-voice-recorder.com/"
          class="text-green-800 text-sm"
          target="_blank"
        >
          <i
            class="fa-solid fa-link fas float-right text-green-400 text-2xl"
          ></i>
          {{ $t("upload.recordURL_title") }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from "@/includes/firebase";

export default {
  name: "Upload",
  data() {
    return {
      is_dragover: false,
      uploads: [],
      audioTypes: [
        "audio/mp3",
        "audio/mpeg",
        "audio/ogg",
        "audio/wav",
        "audio/x-m4a",
      ],
    };
  },
  props: ["addSong"],
  methods: {
    upload($event) {
      this.is_dragover = false;
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];
      files.forEach((file) => {
        if (!this.audioTypes.includes(file.type)) {
          console.log(file.type);
          console.log("regecting file", file.name);
          return;
        }

        const firstPart = file.name.split(".")[0];
        const lastPart = file.name.split(".")[1];

        const storageRef = storage.ref(); // music-c2596.appspot.com

        const songsRef = storageRef.child(
          // split file name by "." and get the last part

          `songs/${firstPart}.${lastPart}`
        ); // music-c2596.appspot.com/songs/example.mp3
        const task = songsRef.put(file);
        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;
        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
            this.uploads[uploadIndex].text_class = "text-red-400";
            console.log(error);
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: "",
              comment_count: 0,
              instrument: "",
            };
            song.url = await task.snapshot.ref.getDownloadURL();
            const songRef = await songsCollection.add(song);
            const songSnapshot = await songRef.get();
            this.addSong(songSnapshot);
            this.uploads[uploadIndex].variant = "bg-green-400";
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].text_class = "text-green-400";
          }
        );
      });
      console.log(files);
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
};
</script>
