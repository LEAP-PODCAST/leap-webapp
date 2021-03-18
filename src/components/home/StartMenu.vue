<template>
  <div class="flex flex-col justify-center align-center border">
      Good Morning {{user.name}}!
      What would you like to do today?
      <button>New Episode</button>
      <button>Create Room</button>
      <button>Upload Video</button>
  </div>
</template>

<script>

export default{
    data: () => ({
        user: {
            name: 'Brene',
            description: '',
        }
    }),
}
</script>

<style lang="scss">

</style>
