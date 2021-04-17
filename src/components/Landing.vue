<template>
  <div class="flex w-full h-full text-white scale-150">
    <div class="hidden md:block md:w-1/12 bg-gray-900"></div>
    <div
      class="w-full flex justify-center md:justify-start md:items-center md:w-6/12 bg-gray-900"
    >
      <div class="p-6 md:ml-6" style="max-width:450px">
        <img src="/images/leap.png" alt="Leap logo" class="mb-6" />
        <h1 class="text-2xl font-bold py-6">
          Effortlessly create, monetize, discover, go live, and interact with
          your audience.
        </h1>

        <div v-if="step === 0">
          <d-btn variant="primary" @click="step = 1" class="w-full mt-5">
            Request Access
          </d-btn>
          <d-btn
            variant="primary-outline"
            @click="$router.push('/LogIn')"
            class="w-full mt-5"
          >
            Log In
          </d-btn>
        </div>

        <div v-else-if="step === 1">
          <d-input type="text" v-model="email" placeholder="Email" />
          <small v-if="errors.email" class="text-red-500">
            {{ errors.email }}
          </small>

          <d-btn variant="primary" @click="submitEmail" class="w-full mt-5">
            Submit
          </d-btn>
        </div>

        <div v-else-if="step === 2">
          Signed up succesfully!
        </div>
      </div>
    </div>
    <div class="hidden md:block md:w-6/12 bg-gray-900"></div>
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
iframe {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  border: 0;
}
</style>
