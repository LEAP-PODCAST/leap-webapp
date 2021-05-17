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
        <div class="controls flex bg-gray-800 rounded-lg py-2">
          <!-- Start Recording -->
          <d-btn
            variant="control"
            content="Start Recording"
            v-tippy="{ placement: 'top' }"
          >
            <div class="material-icons text-red-600">fiber_manual_record</div>
            <div class="text-xs">Record</div>
          </d-btn>

          <!-- Pause -->
          <d-btn
            variant="control"
            content="Start Recording"
            v-tippy="{ placement: 'top' }"
          >
            <div class="material-icons">pause_circle_outline</div>
            <div class="text-xs">Pause</div>
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
            content="Toggle the audience view"
            v-tippy="{ placement: 'top' }"
          >
            <span class="material-icons">people_alt</span>
            <div class="text-xs">Audience</div>
          </d-btn>

          <!-- Guest link -->
          <d-btn
            variant="control"
            content="Copy Guest Link"
            v-tippy="{ placement: 'top' }"
            @click="copyLink"
          >
            <div class="material-icons">content_copy</div>
            <div class="text-xs">Guest Link</div>
          </d-btn>

          <!-- End call -->
          <d-btn
            variant="control"
            class="border-none"
            v-if="isHost"
            @click="endEpisode"
            norounded
            content="End the call for everyone"
            v-tippy="{ placement: 'top' }"
          >
            <span class="material-icons text-red-700">call_end</span>
            <div class="text-xs text-red-700">End Call</div>
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
    copyLink() {
      const el = document.createElement("textarea");
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      this.$notify.success({
        message: "Guest link copied to clipboard",
        bottom: true,
        right: true
      });
    },

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
