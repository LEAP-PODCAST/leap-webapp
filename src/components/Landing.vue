<template>
  <div class="flex flex-col w-full h-full p-6 pt-0 bg-gray-900">
    <header class="flex flex-row items-center p-4">
      <router-link to="/" style="display:contents;">
        <img src="/images/leap.png" class="h-full" alt="Leap Logo" />
      </router-link>
      <div class="flex-grow"></div>
    </header>

    <div class="flex w-full h-full text-white bg-gray-900">
      <div class="hidden md:block md:w-2/12 bg-gray-900"></div>
      <div
        class="w-full flex justify-center md:justify-start md:items-center md:w-6/12 bg-gray-900"
      >
        <div class="p-6 md:ml-6" style="max-width:450px">
          <h1 class="text-6xl font-bold font-oxygen">
            Simplify
          </h1>
          <h1 class="text-6xl font-bold font-oxygen leading-8">
            Podcasting
          </h1>
          <h1 class="text-xl py-6">
            Effortlessly record, monetize, discover, stream, and interact with
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
              <d-input
                type="text"
                v-model="email"
                placeholder="Email"
                required
              />
              <div class="flex space-x-4 mt-2">
                <d-btn variant="primary" type="submit" class="w-4/12"
                  >Submit</d-btn
                >
                <d-btn
                  @click="waitlist = !waitlist"
                  variant="simple"
                  class="w-4/12"
                  >Cancel
                </d-btn>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <img src="/images/valueprop.png" class="w-3/4" alt="Leap Logo" />
      </div>
    </div>
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

<style type="text/css">
header {
  max-height: 4rem;
}
</style>
