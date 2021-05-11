<template>
  <div
    class="p-8 bg-gray-900 text-white rounded-lg w-full"
    style="max-width:600px"
  >
    <h1 class="text-2xl font-bold mb-4">Log in to Leap</h1>
    <div>
      <form @submit.prevent="logIn" class="flex flex-col">
        <div class="mb-3">
          <d-input
            type="text"
            variant="primary"
            v-model="username"
            @blur="verifyUsername"
            placeholder="Email or Username"
            required
          />
        </div>

        <div class="">
          <d-input
            type="password"
            variant="primary"
            v-model="password"
            @blur="verifyPassword"
            placeholder="Password"
            required
          />
        </div>

        <small v-if="errors.general" class="text-red-500">
          {{ errors.general }}
        </small>

        <d-btn type="submit" variant="primary" class="w-full mt-6">
          Log In
        </d-btn>

        <span
          class="self-center mt-3 text-sm text-red-500 cursor-pointer"
          @click="$router.push('/PasswordReset')"
        >
          Forgot your password?
        </span>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
    errors: {
      username: "",
      password: "",
      general: ""
    }
  }),

  methods: {
    async logIn() {
      this.verifyUsername();
      this.verifyPassword();

      if (!!this.errors.username || !!this.errors.password) {
        return;
      }

      const res = await this.$store.dispatch("user/logIn", {
        email: this.username,
        password: this.password
      });

      if (!res.ok) {
        this.errors.general = res.error;
        return;
      }

      this.$router.push("/");
    },

    async verifyUsername() {
      if (!this.username.length) {
        return (this.errors.username = "Username is required.");
      }
      this.errors.username = "";
    },

    verifyPassword() {
      if (!this.password.length) {
        return (this.errors.password = "Password is required.");
      }
      this.errors.password = "";
    }
  }
};
</script>

<style></style>
