<template>
  <app-header />

  <router-view></router-view>

  <AppPlayer />
  <auth-modal />
</template>

<script>
import AppHeader from "./components/Header.vue";
import AuthModal from "./components/Auth.vue";
import AppPlayer from "./components/Player.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch("init_login");
  },
};
</script>
