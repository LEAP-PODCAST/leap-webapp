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
  methods: {
    async createRoom() {
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
