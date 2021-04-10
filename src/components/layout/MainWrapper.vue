<template>
  <div class="flex flex-col w-full h-full p-6 pt-0">
    <header class="flex flex-row items-center p-4">
      <router-link to="/" style="display:contents;">
        <img
          src="https://i.imgur.com/HawjmLR.png"
          class="h-full"
          alt="Leap Logo"
        />
      </router-link>
      <div class="flex-grow"></div>
      <d-input type="search" value="" placeholder="search" />
      <router-link
        to="/"
        class="flex items-center justify-center bg-black rounded-full p-2 ml-3"
      >
        <span class="material-icons text-white">
          home
        </span>
      </router-link>
      <router-link
        to="/"
        class="flex items-center justify-center bg-black rounded-full p-2 ml-3"
      >
        <span class="material-icons text-white">
          videocam
        </span>
      </router-link>
      <router-link
        to="/"
        class="flex items-center justify-center bg-black rounded-full p-2 ml-3"
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
  max-height: 4rem;
}
</style>
