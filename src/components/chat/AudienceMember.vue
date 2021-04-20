<template>
  <div>
    <div class="relative h-12 w-12">
      <d-profile-image class="w-full h-full" />
      <span
        v-if="$store.state.chat.users[socketId].isRequestingToJoinAsGuest"
        class="absolute bg-primary rounded-full p-1 material-icons text-sm text-yellow-500"
        style="bottom: -0.25rem; left: -0.25rem;"
      >
        waving_hand
      </span>
    </div>
    <p class="text-xs">
      {{ $store.state.chat.users[socketId].userProfile.firstName }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    socketId: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
