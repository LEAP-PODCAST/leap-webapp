<template>
  <div class="flex flex-col justify-center align-center border">
      <!-- Good Morning {{user.name}}! -->
      Good Morning!
      What would you like to do today?
      <button @click="$emit('toggle-schedule')">New Episode</button>
      <button>Upload Video</button>
  </div>
</template>

<script>

export default{
}
</script>

<style lang="scss">

</style>
