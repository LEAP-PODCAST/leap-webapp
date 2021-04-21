<template>
  <div class="w-full h-full bg-red-700 rounded-lg ">
    <video
      @contextmenu.prevent="showRemoteWebcamMenu($event)"
      autoplay
      muted
      playsinline
      ref="video"
      class="bg-black object-cover w-full h-full rounded-lg"
    />
    <div class="relative">
      <div class="absolute flex items-end p-2 w-full" style="bottom:0;left:0">
        <div class="bg-gray-900 px-6 py-4 rounded-xl text-white">
          <h2 class="text-lg leading-none">
            {{ user.userProfile.firstName }}
            {{ user.userProfile.lastName }}
          </h2>
          <p class="opacity-50 italic text-xs">
            {{ subtitle }}
          </p>
        </div>
        <div class="flex-grow"></div>
        <d-btn
          v-if="isHost && user.role === 'guest'"
          @click="kickOff"
          variant="primary"
        >
          Kick off
        </d-btn>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api";

export default {
  props: {
    stream: {
      type: Object,
      required: true
    }
  },

  computed: {
    consumer() {
      return this.$store.state.room.consumers[this.stream.producerId];
    },

    track() {
      return this.consumer.track;
    },

    user() {
      return this.$store.state.chat.users[this.stream.socketId];
    },

    subtitle() {
      const podcastName = this.$store.state.room.podcast.name;
      if (this.user.role === "host") return `Host of ${podcastName}`;
      if (this.user.role === "guest") return `Guest on ${podcastName}`;
    },

    isHost() {
      const user = this.$store.state.chat.users[window.socket.id];
      if (!user) return false;
      return user.role === "host";
    }
  },

  async mounted() {
    this.$refs.video.srcObject = new MediaStream([this.track]);
  },

  methods: {
    showRemoteWebcamMenu($event) {
      this.$store.commit("nav/SET_CONTEXT_MENU", {
        id: "remote-webcam",
        data: { $event, stream: this.stream }
      });
    },

    async kickOff() {
      const { ok, error } = await API.room.changeUserRole({
        socketId: this.stream.socketId,
        role: ""
      });

      if (!ok) {
        alert(error);
        return;
      }
    }
  }
};
</script>
