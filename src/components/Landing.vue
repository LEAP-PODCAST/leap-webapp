<template>
  <div class="flex flex-col text-white bg-black">
    
    <div class="flex items-center justify-between pt-6 px-6">
      <div class="">
        <img class="w-1/2" src="/images/leap.png" alt="Leap logo" />
      </div>
      <div class="">
        <d-btn
          variant="primary-outline"
          @click="$router.push('/signup')"
          class="w-full"
        >
          Log In
        </d-btn>
      </div>
    </div>

    <div class='flex flex-col'>
      <div class="flex justify-center items-center mt-40 mb-40">
        <div class="w-1/4">
          <h2 class="text-5xl">Podcasting</h2>
          <h2 class="text-5xl">simplified.</h2>
          <p>Effortlessly create, monetize, distribute, go live, and interact with your audience</p>
          <a class='p-btn flex justify-center inline-block font-bold px-5 w-3/4 mr-5 btn-primary py-2 px-3 rounded-full' href="mailto:support@joinleap.co">Request Access</a>
        </div>
        <div>
          <img class="" src="https://j.gifs.com/Jqwkrg@facebook.gif" alt="">
        </div>
      </div>

      <div class='flex justify-center items-center mb-40'>
        <div class="flex">
          <img class="" src="https://j.gifs.com/Jqwkrg@facebook.gif" alt="">
        </div>
        <div class="w-1/4 box-border pl-6">
          <h2 class="text-3xl">Earn from the get-go.</h2>
          <p>No matter your audience size, effortlessly set up subscriptions in 5 minutes</p>
        </div>
      </div>

      <div class='flex justify-center items-center'>
        <div class="w-1/4">
          <h2 class="text-3xl">Go live with your audience</h2>
          <p>Your audience can participate and collaborate on each episode</p>
        </div>
        <div>
          <img class="" src="https://j.gifs.com/Jqwkrg@facebook.gif" alt="">
        </div>
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
