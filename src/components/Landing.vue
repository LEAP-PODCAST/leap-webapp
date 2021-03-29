<template>
  <div class="text-white bg-black">
    <div class="flex justify-between pt-5">
      <div class="w-1/2">
        <img class="w-1/6 ml-10" src="/images/leap.png" alt="Leap logo" />
      </div>
      <div class="flex w-1/6 justify-between">
        <d-btn
          variant="primary"
          @click="$router.push('/signup')"
          class="w-3/4 mr-5"
        >
          Sign Up
        </d-btn>
        <d-btn
          variant="primary-outline"
          @click="$router.push('/signup')"
          class="w-3/4 mr-5"
        >
          Log In
        </d-btn>
      </div>
    </div>
    <div class="flex flex-col mt-20">
      <div class="flex justify-center mb-20">
        <div class="mr-20">
          <h2 class="text-5xl">Podcasting</h2>
          <h2 class="text-5xl">Simplified.</h2>
          <p>Effortlessly create, monetize, distribute, go live, and interact with your audience</p>
          <d-btn
            variant="primary"
            @click="$router.push('/signup')"
            class="w-full"
          >
            Request Access
          </d-btn>
        </div>
        <div>
          <img class="" src="https://j.gifs.com/Jqwkrg@facebook.gif" alt="">
        </div>
      </div>

      <div class="flex justify-center mb-20">
        <div class="mr-20">
          <img src="data:image/jpeg;base64,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" alt="">
        </div>
        <div>
          <h2 class="text-3xl">Earn from the get-go.</h2>
          <p>No matter your audience size, effortlessly set up subscriptions in 5 minutes</p>
        </div>
      </div>

      <div class="flex justify-center">
        <div class="mr-20">
          <h2 class="text-3xl">Go live with your audience</h2>
          <p>Your audience can participate and collaborate on each episode</p>
        </div>
        <div>
          <img src="data:image/jpeg;base64,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" alt="">
        </div>
      </div>

      <div>
        
      </div>
    </div>
  </div>

  <!-- <div class="flex w-full h-full text-white">
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
  </div> -->
</template>

<script>
export default {};
</script>

<style></style>
