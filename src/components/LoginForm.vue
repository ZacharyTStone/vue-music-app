<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    v-if="showAlert"
    :class="alertVariant"
  >
    {{ alertMessage }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("login.email") }}</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("login.password") }}</label>
      <vee-field
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="inSubmission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      {{ $t("login.submit") }}
    </button>
  </vee-form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:3|max:32",
      },
      inSubmission: false,
      showAlert: false,
      alertVariant: "bg-blue-500",
      alertMessage: this.$t("login.pleaseWait"),
    };
  },
  methods: {
    async login(values) {
      this.inSubmission = true;
      this.showAlert = true;
      this.alertVariant = "bg-blue-500";
      this.alertMessage = this.$t("login.pleaseWait");

      try {
        await this.$store.dispatch("login", values);
      } catch (error) {
        this.inSubmission = false;
        this.alertVariant = "bg-red-500";
        this.alertMessage = this.$t("login.invalidDetails");
        return;
      }

      this.alertVariant = "bg-green-500";
      this.alertMessage = this.$t("login.successLoggedIn");
      //refresh the page
      window.location.reload();
    },
  },
};
</script>
