<template>
  <div class="flex w-full h-full text-white">
    <div class="hidden md:block md:w-6/12"></div>
    <div
      class="w-full flex justify-center md:justify-start md:items-center md:w-6/12 bg-gray-900"
    >
      <div class="p-6 md:ml-6" style="max-width:450px">
        <img src="/images/leap.png" alt="Leap logo" class="mb-6" />
        <h1 class="text-lg font-bold py-6">
          Effortlessly way to create, monetize, distribute, go live, and
          interact with your audience.
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
          <form class="flex flex-col" action="">
            <d-input type="text" v-model="email" placeholder="Email" required />
            <d-btn variant="primary" class="mt-2">Submit</d-btn>
            <d-btn
              @click="waitlist = !waitlist"
              variant="primary-outline"
              class="mt-5"
              >Cancel</d-btn
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    waitlist: false
  })
};
</script>

<style></style>
