<template>
  <div class="flex w-full h-full">
    <div class="w-full h-full md:w-5/12 p-2">
      <Profile
        :profile="$store.state.user.userProfile"
        class="display-card"
      ></Profile>
    </div>
    <div class="p-2 w-full h-full md:w-7/12">
      <div class="display-card">
        <CreateRoom></CreateRoom>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/components/home/Profile";
import CreateRoom from "@/components/home/CreateRoom";

export default {
  components: {
    CreateRoom,
    Profile
  }
};
</script>

<style lang="scss">
.display-card {
  @apply .text-white;
  @apply .bg-black-800;
  @apply .w-full;
  @apply .h-full;
  @apply .rounded-lg;
}
</style>
