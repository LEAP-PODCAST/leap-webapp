<template>
  <div class="flex flex-col w-full h-full p-6 pt-0 bg-gray-900">
    <header class="flex flex-row items-center p-4">
      <router-link to="/" style="display:contents;">
        <img src="/images/leap.png" class="h-full" alt="Leap Logo" />
      </router-link>
      <div class="flex-grow"></div>
    </header>

    <main class="flex justify-center mt-20">
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
