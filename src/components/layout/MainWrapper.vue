<template>
  <div class="flex flex-col w-full h-full pt-0">
    <header class="flex flex-row items-center p-4 bg-gray-900">
      <router-link to="/" style="display:contents;">
        <img src="/images/leap.png" class="h-full" alt="Leap Logo" />
      </router-link>
      <div class="flex-grow"></div>

      <!-- <d-input type="text" value="" placeholder="search" /> -->

      <router-link
        to="/"
        class="flex items-center justify-center bg-black rounded-full p-1 ml-3 text-xs"
      >
        <span class="material-icons text-white">
          home
        </span>
      </router-link>
      <router-link
        to="/"
        class="flex items-center justify-center bg-black rounded-full p-1 ml-3"
      >
        <span class="material-icons text-white">
          videocam
        </span>
      </router-link>
      <router-link
        to="/"
        class="flex items-center justify-center bg-black rounded-full p-1 ml-3"
      >
        <span class="material-icons text-white">
          account_circle
        </span>
      </router-link>
    </header>

    <main class="flex-grow">
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  max-height: 3rem;
}
</style>
