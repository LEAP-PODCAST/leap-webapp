<template>
  <div v-if="!waitlist" class="flex w-full h-full text-white scale-150">
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
      </div>
    </div>
    <div class="hidden md:block md:w-6/12 bg-gray-900"></div>
  </div>

  <div v-else>
    <iframe
      id="typeform-full"
      width="100%"
      height="100%"
      frameborder="0"
      allow="camera; microphone; autoplay; encrypted-media;"
      src="https://form.typeform.com/to/VaXJD5AB?typeform-medium=embed-snippet"
    ></iframe>
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
iframe {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  border: 0;
}
</style>
