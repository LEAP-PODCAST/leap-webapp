<template>
  <div
    v-if="$store.state.room.episode"
    class="flex w-full h-full bg-black-800 rounded-lg p-5"
  >
    <div class="flex flex-col overflow-hidden w-full">
      <h2 class="text-2xl text-white">
        {{ $store.state.room.episode.name }}
      </h2>
      <h2 class="text-white opacity-50">
        {{ $store.state.room.podcast.name }}
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
import { mapGetters } from "vuex";

import API from "@/api";

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
    ...mapGetters("user", ["isLoggedIn"]),
    ...mapGetters("chat", ["isAbleToProduce"]),

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
    await this.$nextTick();

    // Join episode
    const res = await this.$store.dispatch("room/watchEpisode", {
      podcastUrlName: this.$route.params.podcastUrlName,
      episodeUrlName: this.$route.params.episodeUrlName
    });

    if (!res.ok) {
      alert(res.error);
      return;
    }

    // Attempt to authenticate user
    if (this.isLoggedIn) {
      const res2 = await API.episode.authenticate();

      if (!res2.ok) {
        alert(res2.error);
        return;
      }

      // Show produce modal if user is loggedIn and host/guest
      if (this.isAbleToProduce) {
        this.$store.dispatch("nav/showModal", {
          id: "join-room",
          data: { noclose: true }
        });
      }
    }
  },

  beforeDestroy() {
    this.$store.dispatch("room/leave");
  },

  watch: {
    isAbleToProduce(value) {
      this.$notify.success({
        message: value
          ? "You were added as a speaker!"
          : "You were removed as a speaker.",
        bottom: true,
        right: true
      });
    }
  }
};
</script>

<style></style>
