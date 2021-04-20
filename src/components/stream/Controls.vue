<template>
  <div
    class="flex rounded-lg"
    :class="isAbleToProduce && !isProducing ? 'bg-primary' : ''"
  >
    <!-- Middle controls -->
    <div class="flex justify-center">
      <div v-if="isAbleToProduce">
        <button
          v-if="!isProducing"
          @click="$store.dispatch('nav/showModal', { id: 'join-room' })"
          class="bg-primary rounded-tl-lg rounded-tr-lg w-full p-2 text-white font-bold"
        >
          Join with Webcam and Microphone
        </button>
        <div class="controls flex bg-gray-700 rounded-lg">
          <!-- Start Recording -->
          <d-btn
            variant="control"
            class="control-button text-red-700"
            disabled
            content="Start Recording"
            v-tippy="{ placement: 'top' }"
          >
            <div class="material-icons">fiber_manual_record</div>
            <div class="text-xs">Record</div>
          </d-btn>

          <!-- Mute Microphone
        <button
          v-if="!$store.state.room.localStreams.mic"
          @click="$store.dispatch('room/produceMic')"
          :disabled="!!room.activeProduceHandshakeType"
          class="control-button"
        >
          <div class="material-icons">mic</div>
          <div class="text-xs">Enable Mic</div>
        </button>
        <button
          v-else
          @click="$store.dispatch('room/stopProduceMic')"
          class="text-red-700 p-6"
        >
          <div class="material-icons">mic_off</div>
          <div class="text-xs">Disable Mic</div>
        </button>

        <button
          v-if="!room.localStreams.webcam"
          @click="$store.dispatch('room/produceWebcam')"
          :disabled="!!room.activeProduceHandshakeType"
          class="control-button"
        >
          <span class="material-icons">videocam</span>
          <div class="text-xs">Enable Webcam</div>
        </button>
        <button
          v-else
          @click="$store.dispatch('room/stopProduceWebcam')"
          class="text-red-700 p-6"
        >
          <span class="material-icons">videocam_off</span>
          <div class="text-xs">Disable Webcam</div>
        </button> -->

          <!-- Mark Timestamp -->
          <d-btn
            variant="control"
            class="control-button"
            disabled
            content="Mark this timestamp for later as a highlight"
            v-tippy="{ placement: 'top' }"
          >
            <div class="material-icons">bookmark</div>
            <div class="text-xs">Mark</div>
          </d-btn>

          <!-- Show Audience -->
          <d-btn
            variant="control"
            @click="$store.dispatch('nav/toggleChat')"
            :class="$store.state.nav.chat ? '' : ''"
            class="control-button"
            content="Toggle the audience view"
            v-tippy="{ placement: 'top' }"
          >
            <span class="material-icons">people_alt</span>
            <div class="text-xs">Audience</div>
          </d-btn>

          <!-- End call -->
          <d-btn
            variant="control"
            v-if="isHost"
            @click="endEpisode"
            norounded
            class="control-button bg-red-600 rounded-tr-lg rounded-br-lg"
            content="End the call for everyone"
            v-tippy="{ placement: 'top' }"
          >
            <span class="material-icons">call_end</span>
            <div class="text-xs">End Call</div>
          </d-btn>
        </div>
      </div>

      <!-- 
        
        Audience controls
        
      -->
      <div v-else class="controls flex bg-gray-700 rounded-lg">
        <!-- Show Share Menu -->
        <d-btn
          variant="control"
          disabled
          class="control-button"
          content="Share on social media or copy the link"
          v-tippy="{ placement: 'top' }"
        >
          <span class="material-icons">share</span>
          <div class="text-xs">Share</div>
        </d-btn>

        <!-- Raise Hand (Request to join) -->
        <d-btn
          variant="control"
          @click="requestToJoinAsGuest"
          class="control-button"
          content="Request to join the conversation"
          v-tippy="{ placement: 'top' }"
        >
          <span class="material-icons">waving_hand</span>
          <div>Raise Hand</div>
        </d-btn>

        <!-- Show Audience -->
        <d-btn
          variant="control"
          @click="$store.dispatch('nav/toggleChat')"
          :class="$store.state.nav.chat ? '' : ''"
          content="Toggle the audience view"
          v-tippy="{ placement: 'top' }"
          class="control-button"
        >
          <span class="material-icons">people_alt</span>
          <div class="text-xs">Audience</div>
        </d-btn>

        <!-- Raise Hand (Request to join) -->
        <d-btn
          variant="control"
          @click="$router.push('/')"
          content="Leave the room"
          v-tippy="{ placement: 'top' }"
          class="control-button"
        >
          <span class="material-icons">meeting_room</span>
          <div class="text-xs">Leave</div>
        </d-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import API from "@/api";

export default {
  data: () => ({
    isAddVideoModalVisible: false
  }),

  computed: {
    ...mapGetters("chat", ["isAbleToProduce"]),

    roomUrl() {
      return window.location.origin + this.$route.path;
    },

    room() {
      return this.$store.state.room;
    },

    isHost() {
      const user = this.$store.state.chat.users[window.socket.id];
      if (!user) return false;
      return user.role === "host";
    },

    isProducing() {
      return (
        !!this.$store.state.room.producers.webcam &&
        !!this.$store.state.room.producers.mic
      );
    }
  },

  methods: {
    async requestToJoinAsGuest() {
      const { ok, error } = await API.room.requestToJoinAsGuest();

      if (!ok) {
        alert(error);
        return;
      }
    },

    async endEpisode() {
      const { ok } = await this.$store.dispatch("room/endEpisode");

      if (ok) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.control-button {
  font-size: 0.66rem;
  @apply .text-white;
  @apply .p-3;
  @apply .w-20;
}
</style>
