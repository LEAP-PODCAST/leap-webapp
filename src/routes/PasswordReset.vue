<template>
  <div
    class="p-8 bg-gray-900 text-white rounded-lg w-full"
    style="max-width:600px"
  >
    <h1 class="text-2xl font-bold mb-4">Reset Password</h1>

    <div v-if="reset">
      <p>Email sent!</p>
      <p>Please check your inbox to reset your password.</p>
      <p>Make sure to check the spam folder!</p>
    </div>

    <form v-if="!reset">
      <div class="mb-3">
        <d-input
          type="text"
          v-model="username"
          @blur="verifyUsername"
          placeholder="Email"
          required
        />
      </div>
      <div class="flex space-x-4">
        <d-btn
          type="submit"
          variant="primary"
          class="w-4/12"
          @click="resetPasswordPrompt()"
        >
          Reset
        </d-btn>

        <d-btn
          type="submit"
          variant="primary-outline"
          class="w-4/12"
          @click="returnToLogin()"
        >
          Cancel
        </d-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    reset: false
  }),
  methods: {
    returnToLogin() {
      this.$router.push("/login");
    },
    resetPasswordPrompt() {
      this.reset = true;
    }
  }
};
</script>

<style></style>
