<template>
  <div class="flex w-full h-full">
    <div class="flex-grow overflow-hidden">
      <div
        class="relative flex justify-center flex-grow bg-gray-900 p-2"
        style="height: calc(100% - 56px)"
      >
        <div
          v-if="!webcams"
          class="flex items-center justify-center w-full h-full text-gray-300"
        >
          <div class="w-full max-w-lg">
            <h1 class="text-2xl mb-6 leading-none">
              Welcome
              <span class="font-bold">{{ room.username }}</span>
              , here are some quick actions:
            </h1>
            <ul>
              <li v-if="!room.localStreams.mic" class="flex items-center mb-2">
                <d-btn
                  @click="$store.dispatch('room/produceMic')"
                  variant="none"
                  class="p-btn inline-block rounded font-bold bg-dark-2 px-3 py-2"
                >
                  <span class="material-icons mr-2">mic</span>
                  Capture Mic
                </d-btn>
                <span class="ml-2">Speak your mind.</span>
              </li>
              <li
                v-if="!room.localStreams.webcam"
                class="flex items-center mb-2"
              >
                <d-btn
                  @click="$store.dispatch('room/produceWebcam')"
                  variant="none"
                  class="p-btn inline-block rounded font-bold bg-dark-2 px-3 py-2"
                >
                  <span class="material-icons mr-2">videocam</span>
                  Capture Webcam
                </d-btn>
                <span class="ml-2">Match a face to your voice.</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-else
          class="flex flex-wrap md:flex-row items-center justify-center w-full h-full"
        >
          <VideoContainer class="w-full h-full">
            <div
              v-for="stream in webcams"
              :key="stream.producerId"
              class="video"
            >
              <LocalWebcam v-if="room.localStreams.webcam" />
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

      <Controls class="w-full" />
    </div>
    <ChatRoom v-if="$store.state.nav.chat" class="flex-shrink-0" />
  </div>
</template>

<script>
import VideoContainer from "@/components/VideoContainer";
import LocalWebcam from "@/components/stream/LocalWebcam";
import RemoteWebcam from "@/components/stream/RemoteWebcam";
import VoiceChatter from "@/components/stream/VoiceChatter";
import Controls from "@/components/stream/Controls";
import ChatRoom from "@/components/ChatRoom";

export default {
  components: {
    VideoContainer,
    LocalWebcam,
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
    this.$store.dispatch("nav/showModal", {
      id: "join-room",
      data: { noclose: true }
    });
  },

  beforeDestroy() {
    this.$store.dispatch("room/leave");
  }
};
</script>

<style></style>
