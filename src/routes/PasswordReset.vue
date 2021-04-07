<template>
  <div
    class="p-8 bg-gray-900 text-white rounded-lg m-auto"
    style="max-width:600px"
  >
    <h1 class="text-2xl font-bold mb-4">Reset Password</h1>
    <form>
      <div class="mb-3">
        <d-input
          type="text"
          v-model="username"
          @blur="verifyUsername"
          placeholder="Email"
          required
        />
      </div>

      <d-btn type="submit" variant="primary" class="w-full mt-6">
        Reset Password
      </d-btn>
      <d-btn
        type="submit"
        variant="primary-outline"
        class="w-full mt-3"
        @click="returnToLogin()"
      >
        Cancel
      </d-btn>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    returnToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
