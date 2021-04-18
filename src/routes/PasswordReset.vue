<template>
  <div
    class="p-8 bg-gray-900 text-white rounded-lg w-full"
    style="max-width:600px"
  >
    <h1 class="text-2xl font-bold mb-4">Reset Password</h1>

    <div v-if="reset && verified">
      <p>An Email has been sent if you're an existing leap user!</p>
      <p>Please check your inbox to reset your password.</p>
      <p>Make sure to check the spam folder!</p>
    </div>

    <form v-else @submit.prevent="resetPasswordPrompt()">
      <div class="mb-3">
        <d-input
          type="text"
          v-model="email"
          placeholder="Email"
          @blur="verifyEmail"
          required
        />
        <small v-if="errors.email" class="text-red-500">
          {{ errors.email }}
        </small>
      </div>
      <div class="flex space-x-4">
        <d-btn type="submit" variant="primary" class="w-4/12">
          Reset
        </d-btn>

        <d-btn variant="simple" class="w-3/12" @click="returnToLogin()">
          Cancel
        </d-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    reset: false,
    verified: false,
    email: "",
    errors: {
      email: ""
    }
  }),
  methods: {
    returnToLogin() {
      this.$router.push("/login");
    },
    resetPasswordPrompt() {
      this.reset = true;
      this.verified = true;
    },
    verifyEmail() {
      if (!this.email.length) {
        return (this.errors.email = "Email is required.");
      }
      if (!regex.email.test(this.email)) {
        return (this.errors.email = "That email appears to be invalid.");
      }
      if (this.email.length > 32) {
        return (this.errors.email = "Email must be 32 characters or less.");
      }
      // TODO check if email is available
      this.errors.email = "";
    }
  }
};
</script>

<style></style>
