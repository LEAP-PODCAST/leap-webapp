<template>
  <div class="flex rounded-lg bg-gray-700">
    <!-- Middle controls -->
    <div class="flex justify-center">
      <div class="controls flex">
        <!-- Start Recording -->
        <button class="text-red-700 px-4 py-2" disabled>
          <div class="material-icons">fiber_manual_record</div>
          <div class="text-sm">Start Recording</div>
        </button>

        <!-- Mute Microphone -->
        <button
          v-if="!$store.state.room.localStreams.mic"
          @click="$store.dispatch('room/produceMic')"
          :disabled="!!room.activeProduceHandshakeType"
          class="text-white px-4 py-2"
        >
          <div class="material-icons">mic</div>
          <div class="text-sm">Enable Mic</div>
        </button>
        <button
          v-else
          @click="$store.dispatch('room/stopProduceMic')"
          class="text-red-700 px-4 py-2"
        >
          <div class="material-icons">mic_off</div>
          <div class="text-sm">Disable Mic</div>
        </button>

        <!-- Webcam -->
        <button
          v-if="!room.localStreams.webcam"
          @click="$store.dispatch('room/produceWebcam')"
          :disabled="!!room.activeProduceHandshakeType"
          class="text-white px-4 py-2"
        >
          <span class="material-icons">videocam</span>
          <div class="text-sm">Enable Webcam</div>
        </button>
        <button
          v-else
          @click="$store.dispatch('room/stopProduceWebcam')"
          class="text-red-700 px-4 py-2"
        >
          <span class="material-icons">videocam_off</span>
          <div class="text-sm">Disable Webcam</div>
        </button>

        <!-- Mark Timestamp -->
        <button class="text-white px-4 py-2" disabled>
          <div class="material-icons">bookmark</div>
          <div class="text-sm">Mark</div>
        </button>

        <!-- Show Audience -->
        <button
          @click="$store.dispatch('nav/toggleChat')"
          :class="$store.state.nav.chat ? '' : ''"
          disabled
          class="text-white px-4 py-2"
        >
          <span class="material-icons">people_alt</span>
          <div class="text-sm">Audience</div>
        </button>

        <!-- End call -->
        <button class="text-white bg-red-600 rounded-lg px-5 ml-8">
          <span class="material-icons">call_end</span>
          <div class="text-sm">End Call</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isAddVideoModalVisible: false
  }),

  computed: {
    roomUrl() {
      return window.location.origin + this.$route.path;
    },

    room() {
      return this.$store.state.room;
    }
  }
};
</script>

<style lang="scss"></style>
