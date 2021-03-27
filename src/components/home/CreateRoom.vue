<template>
  <div class="p-8 w-full h-full text-center">
    <div
      v-if="step === 0"
      class="flex flex-col justify-center align-center w-full h-full"
    >
      <div>
        <span class="text-sm font-thin opacity-75">
          Good {{ timeOfDayText }},
          {{ $store.state.user.userProfile.firstName }}!
        </span>
        <h2 class="text-2xl">
          What would you like to do today?
        </h2>
      </div>
      <div class="flex flex-col items-center mt-8">
        <d-btn @click="step = 1" variant="primary">
          New episode
        </d-btn>
        <small class="italic text-xs opacity-50 my-2">or</small>
        <d-btn @click="createRoom" variant="primary-outline">
          Create room
        </d-btn>
      </div>
    </div>
    <div v-else-if="step === 1">
      <span class="text-sm font-thin opacity-75">
        Good {{ timeOfDayText }}, {{ $store.state.user.userProfile.firstName }}!
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    step: 0
  }),

  computed: {
    timeOfDayText() {
      const hours = new Date().getHours();
      if (hours > 3 && hours < 13) return "morning";
      if (hours > 12 && hours < 18) return "aftenoon";
      return "evening";
    }
  },

  methods: {
    async createRoom() {
      // TODO this will be set on the server side
      const roomId = Math.random()
        .toString(36)
        .substr(2, 9);
      const res = await this.$store.dispatch("room/join", {
        roomId
      });
      if (!res) return;
      this.$router.push(`/room/${roomId}`);
    }
  }
};
</script>

<style lang="scss"></style>
