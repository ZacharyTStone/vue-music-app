<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    v-if="showAlert"
    :class="alertVariant"
  >
    {{ alertMessage }}
  </div>
  <vee-form
    :validation-schema="schema"
    @submit="register"
    :initial-values="userData"
  >
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.name") }}</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.email") }}</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.password") }}</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{
        $t("register.confirm_password")
      }}</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <button
      type="submit"
      :disabled="inSubmission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      {{ $t("register.submit") }}
    </button>
  </vee-form>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        password: "required|min:3|max:100",
        confirm_password: "passwords_mismatch:@password",
      },
      userData: {},
      inSubmission: false,
      showAlert: false,
      alertVariant: "bg-blue-500",
      alertMessage: "Please wait! Your account is being created.",
    };
  },
  methods: {
    async register(values) {
      this.showAlert = true;
      this.inSubmission = true;
      this.alertVariant = "bg-blue-500";
      this.alertMessage = "Please wait! Your account is being created.";

      try {
        await this.$store.dispatch("register", values);
      } catch (error) {
        this.inSubmission = false;
        this.alertVariant = "bg-red-500";
        this.alertMessage =
          "An unexpected error occurred. Please try again later.";
        return;
      }

      this.alertVariant = "bg-green-500";
      this.alertMessage = "Success! Your account has been created.";
      window.location.reload();
    },
  },
};
</script>
