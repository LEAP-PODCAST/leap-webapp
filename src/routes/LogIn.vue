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
            v-model="username"
            @blur="verifyUsername"
            placeholder="Email or Username"
            required
          />
        </div>

        <div class="">
          <d-input
            type="password"
            v-model="password"
            @blur="verifyPassword"
            placeholder="Password"
            required
          />
        </div>

        <d-btn type="submit" variant="primary" class="w-full mt-6">
          Log In
        </d-btn>

        <span
          class="self-center mt-3 text-sm text-red-500 cursor-pointer"
          @click="$router.push('/PasswordReset')"
          >Forgot your password?
        </span>
      </form>
    </div>
  </div>
</template>

<script>
const regex = {
  username: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/
};

export default {
  data: () => ({
    username: "",
    password: "",
    errors: {
      username: "",
      password: ""
    }
  }),
  methods: {
    async logIn() {
      this.verifyUsername();
      this.verifyPassword();

      if (!!this.errors.username || !!this.errors.password) {
        return;
      }

      console.log("LOGIN FORM");
      console.log(this.username);
      console.log(this.password);

      const res = await this.$store.dispatch("user/logIn", {
        email: this.username,
        password: this.password
      });

      this.$router.push("/");
    },

    async verifyUsername() {
      if (!this.username.length) {
        return (this.errors.username = "Username is required.");
      }
      if (!regex.username.test(this.username)) {
        return (this.errors.username =
          "Usernames can only contain a-z, A-Z, 0-9, _, - characters. Cannot start or begin with _ or -.");
      }
      if (this.username.length > 20) {
        return (this.errors.username =
          "Usernames must be 20 characters or less.");
      }
      // TODO check if username is available
      this.errors.username = "";
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
    }
  }
};
</script>

<style></style>
