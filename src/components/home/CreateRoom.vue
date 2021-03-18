<template>
  <div class="flex flex-col justify-center align-center border">
      Good Morning {{user.name}}!
      What would you like to do today?
      <button v-on:click.prevent='createRoom()'>New Episode</button>
      <button v-on:click.prevent='createRoom()'>Create Room</button>
      <button>Upload Video</button>
  </div>
</template>

<script>

export default{
    data: () => ({
        //TODO I need to get this data from the parent?
        user: {
            name: 'Brene',
            description: '',
        }
    }),
  methods: {
    async createRoom() {
        console.log('saddsadsa')
      if (!this.name) return;
      // TODO this will be set on the server side
      const roomId = Math.random()
        .toString(36)
        .substr(2, 9);
      const res = await this.$store.dispatch("room/join", {
        roomId,
        username: this.name
      });
      if (!res) return;
      this.$router.push(`/${roomId}`);
    }
  }    
}
</script>

<style lang="scss">

</style>
