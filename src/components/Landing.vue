<template>
  <div class="flex flex-col w-full h-full md:p-6 md:pt-0 bg-gray-900">
    <header class="flex flex-row items-center p-4 mt-4 md:mt-0">
      <router-link to="/" style="display:contents;">
        <img src="/images/leap.png" class="h-full" alt="Leap Logo" />
      </router-link>
      <div class="flex-grow"></div>
    </header>

    <div class="flex w-full h-full text-white">
      <div class="hidden md:block md:w-1/12"></div>

      <div
        class="flex flex-col items-center w-full md:flex-row md:justify-start md:items-center"
      >
        <div class="flex w-full justify-center items-center mt-6 md:hidden">
          <img src="../assets/valueprop.png" class="w-full" alt="Leap Logo" />
        </div>

        <div
          class="flex flex-col justify-center mt-6 md:mx-0 md:mt-0 md:ml-6"
          style="max-width:450px"
        >
          <h1 class="text-6xl font-bold font-oxygen">
            Simplify
          </h1>
          <h1 class="text-6xl font-bold font-oxygen leading-8">
            Podcasting
          </h1>
          <h1 class="text-xl py-6">
            Leap is the easiest way to watch, share, create, and monetize video
            podcasts.
          </h1>

          <div v-if="step === 0">
            <d-btn variant="primary" @click="step = 1" class="w-full mt-5">
              Get Early Access
            </d-btn>
            <!-- <d-btn
              variant="primary-outline"
              @click="$router.push('/LogIn')"
              class="w-full mt-5"
            >
              Log In
            </d-btn> -->
          </div>

          <div v-else-if="step === 1">
            <d-input type="text" v-model="email" placeholder="Email" />
            <small v-if="errors.email" class="text-red-500">
              {{ errors.email }}
            </small>

            <d-btn variant="primary" @click="submitEmail" class="w-full mt-5">
              Submit
            </d-btn>
            <d-btn variant="simple" @click="step = 0" class="w-full mt-2">
              Cancel
            </d-btn>
          </div>

          <div v-else-if="step === 2">
            Signed up successfully!
          </div>
        </div>

        <div
          class="hidden md:flex md:w-full md:h-full md:justify-center md:items-center p-12"
        >
          <img src="../assets/valueprop.png" class="w-full" alt="Leap Logo" />
        </div>

        <div class="hidden md:block md:w-1/12"></div>
      </div>
    </div>
  </div>
</template>

<script>
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

import API from "@/api";

export default {
  data: () => ({
    step: 0,
    email: "",
    errors: {
      email: ""
    }
  }),

  methods: {
    async verifyEmail() {
      if (!this.email.length) {
        return (this.errors.email = "Email is required.");
      }
      if (!emailRegex.test(this.email)) {
        return (this.errors.email = "That email appears to be invalid.");
      }
      if (this.email.length > 32) {
        return (this.errors.email = "Email must be 32 characters or less.");
      }
      // TODO check if email is available
      this.errors.email = "";
    },

    async submitEmail() {
      this.verifyEmail();
      if (this.errors.email.length) return;

      const res = await API.general.emailList({ email: this.email });

      if (!res.ok) {
        this.errors.email = res.error;
        return;
      }

      this.step = 2;
    }
  }
};
</script>

<style type="text/css">
header {
  max-height: 4rem;
}
</style>
