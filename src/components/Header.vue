<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        {{ $t("header.music") }}
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="toggleAuthModal"
            >
              {{ $t("header.login_register") }}
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'profile' }">
                {{ $t("header.profile") }}
              </router-link>
            </li>
            <li>
              <a class="px-2 text-white" @click.prevent="signout" href="#">
                {{ $t("header.logout") }}
              </a>
            </li>
          </template>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a class="px-2 text-white" @click.prevent="changeLocale" href="#">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState(["userLoggedIn"]),
    currentLocale() {
      return this.$i18n.locale === "en"
        ? this.$t("locales.japanese")
        : this.$t("locales.english");
    },
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "en" ? "ja" : "en";
    },
    signout() {
      this.$store.dispatch("signout", {
        router: this.$router,
        route: this.$route,
      });

      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
