<template>
  <div class="flex">
    <div class="flex flex-col">
      <Profile></Profile>
      <Analytics></Analytics>
    </div>
    <CreateRoom v-if='schedule' @toggle-schedule='toggleSchedule'></CreateRoom>
    <Schedule v-else></Schedule>
  </div>
</template>

<script>
import Profile from "@/components/home/Profile";
import CreateRoom from "@/components/home/CreateRoom";
import Analytics from "@/components/home/Analytics";
import Schedule from "@/components/home/Schedule";

export default {
  components: {
    CreateRoom,
    Profile,
    Analytics,
    Schedule
  },

  data: () => ({
    schedule: true
  }),

  methods:{
    toggleSchedule() {this.schedule = !this.schedule},
    
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
};
</script>

<style></style>
