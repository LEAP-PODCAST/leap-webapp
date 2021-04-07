<template>
  <div
    class="p-8 bg-gray-900 text-white rounded-lg m-auto"
    style="max-width:600px"
  >
    <h1 class="text-2xl font-bold mb-4">New Password</h1>

    <form @submit.prevent="toLoginPage">
      <div class="mb-3">
        <d-input
          type="password"
          v-model="password"
          @blur="verifyPassword"
          placeholder="Password"
          required
        />
        <small v-if="errors.password" class="text-red-500">
          {{ errors.password }}
        </small>
      </div>
      <div class="mb-8">
        <d-input
          type="password"
          v-model="password2"
          @blur="verifyPassword2"
          placeholder="Re-enter Password"
          required
        />
        <small v-if="errors.password2" class="text-red-500">
          {{ errors.password2 }}
        </small>
        <small v-if="errors.passwordsMatch" class="text-red-500">
          {{ errors.passwordsMatch }}
        </small>
      </div>
      <d-btn
        type="submit"
        variant="primary"
        class="w-full mt-6"
        @click="verifyPasswordsMatch()"
      >
        Let's go
      </d-btn>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    password: "",
    password2: "",

    errors: {
      password: "",
      password2: "",
      passwordsMatch: ""
    }
  }),
  methods: {
    returnToMainPage() {
      this.$router.push("/");
    },
    verifyPassword() {
      if (!this.password.length) {
        return (this.errors.password = "Password is required.");
      }
      if (this.password.length > 64) {
        return (this.errors.password =
          "Password must be 64 characters or less.");
      }
      this.errors.password = "";
    },

    verifyPassword2() {
      if (!this.password2.length) {
        return (this.errors.password2 = "Password is required.");
      }
      if (this.password2.length > 64) {
        return (this.errors.password2 =
          "Password must be 64 characters or less.");
      }
      this.errors.password2 = "";
    },

    verifyPasswordsMatch() {
      if (this.password !== this.password2) {
        return (this.errors.passwordsMatch = "Passwords do not match.");
      }
      this.errors.passwordsMatch = "";
    },

    toLoginPage() {
      this.verifyPassword();
      this.verifyPassword2();
      this.verifyPasswordsMatch();

      if (
        !!this.errors.password ||
        !!this.errors.password2 ||
        !!this.errors.passwordsMatch
      ) {
        return;
      }

      this.$router.push("/");
    }
  }
};
</script>

<style></style>
