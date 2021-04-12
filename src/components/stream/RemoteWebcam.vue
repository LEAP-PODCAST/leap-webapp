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
      <div
        class="absolute bg-gray-900 px-6 py-4 rounded-xl text-white"
        style="bottom:2rem;left:2rem"
      >
        <h2 class="text-lg leading-none">
          {{ user.firstName }} {{ user.lastName }}
        </h2>
        <p class="opacity-50 italic text-sm">@{{ user.fullUsername }}</p>
      </div>
    </div>
  </div>
</template>

<script>
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
      return this.$store.state.chat.users[this.stream.socketId].userProfile;
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
    }
  }
};
</script>
