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
          interact with their audience.
        </h1>
        <d-btn
          variant="primary"
          @click="$router.push('/signup')"
          class="w-full"
        >
          Sign Up
        </d-btn>
        <d-btn
          variant="primary-outline"
          @click="$router.push('/signup')"
          class="w-full mt-5"
        >
          Log In
        </d-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
