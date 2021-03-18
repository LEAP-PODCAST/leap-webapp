<template>
  <div class="flex">
    <div class="flex flex-col">
      <Profile></Profile>
      <Analytics></Analytics>
    </div>
    <CreateRoom></CreateRoom>
    <Schedule></Schedule>
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
};
</script>

<style></style>
