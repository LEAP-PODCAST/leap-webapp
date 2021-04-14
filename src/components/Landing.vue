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

        <div v-if="!waitlist">
          <d-btn
            variant="primary"
            @click="waitlist = !waitlist"
            class="w-full mt-5"
          >
            Join the Waitlist
          </d-btn>
          <d-btn
            variant="primary-outline"
            @click="$router.push('/LogIn')"
            class="w-full mt-5"
          >
            Log In
          </d-btn>
        </div>

        <div v-if="waitlist">
          <form class="flex flex-col" @submit.prevent="submitEmail">
            <d-input type="text" v-model="email" placeholder="Email" required />
            <div class="flex space-x-4 mt-2">
              <d-btn variant="primary" type="submit" class="w-4/12"
                >Submit</d-btn
              >
              <d-btn
                @click="waitlist = !waitlist"
                variant="primary-outline"
                class="w-4/12"
                >Cancel
              </d-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="hidden md:block md:w-6/12 bg-gray-900"></div>
  </div>
</template>

<script>
import API from "@/api";

export default {
  data: () => ({
    waitlist: false,
    email: ""
  }),
  methods: {
    submitEmail() {
      API.general.emailList({ email: this.email });
    }
  }
};
</script>

<style></style>
