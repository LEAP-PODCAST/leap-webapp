<template>
  <div class="flex w-full h-full bg-black-800 rounded-tl-lg rounded-tr-lg p-5">
    <div class="flex flex-col overflow-hidden w-full">
      <h2 class="text-2xl text-white">
        #23 - Yussef Guf
      </h2>
      <div class="flex-grow p-2" id="room-container">
        <div
          class="flex flex-wrap md:flex-row items-center justify-center w-full h-full"
        >
          <VideoContainer class="w-full h-full">
            <div
              v-for="stream in webcams"
              :key="stream.producerId"
              class="video"
            >
              <RemoteWebcam :stream="stream" />
            </div>
          </VideoContainer>
        </div>
      </div>

      <!-- Hidden Audio Players (eg: Voice Chat) -->
      <div class="absolute visually-hidden">
        <VoiceChatter
          v-for="stream in mics"
          :key="stream.producerId"
          :stream="stream"
        />
      </div>

      <div class="flex justify-center w-full">
        <Controls />
      </div>
    </div>
    <ChatRoom v-if="$store.state.nav.chat" class="flex-shrink-0" />
  </div>
</template>

<script>
import VideoContainer from "@/components/VideoContainer";
import RemoteWebcam from "@/components/stream/RemoteWebcam";
import VoiceChatter from "@/components/stream/VoiceChatter";
import Controls from "@/components/stream/Controls";
import ChatRoom from "@/components/ChatRoom";

export default {
  components: {
    VideoContainer,
    RemoteWebcam,
    VoiceChatter,
    Controls,
    ChatRoom
  },

  computed: {
    room() {
      return this.$store.state.room;
    },

    webcams() {
      return this.room.streams.webcam;
    },

    mics() {
      return this.room.streams.mic;
    }
  },

  async mounted() {
    if (this.$store.state.room.roomId) return;
    this.$store.dispatch("room/join", {
      roomId: this.$route.params.roomId,
      username: "Anonymous"
    });
  },

  beforeDestroy() {
    this.$store.dispatch("room/leave");
  }
};
</script>

<style></style>
