<template>
  <div class="w-full max-w-128 m-auto">
    <div class="text-center">
      <span class="text-sm font-thin opacity-75">
        Check sound and video
      </span>
      <h2 class="text-2xl">
        Ready? 🔥
      </h2>
    </div>

    <div class="flex items-center relative my-6">
      <video
        autoplay
        muted
        playsinline
        ref="video"
        class="bg-black w-full max-w-128 max-h-32 m-auto rounded-lg"
      />
      <!-- <div class="relative">
        <div
          class="absolute bg-gray-900 px-6 py-4 rounded-xl text-white"
          style="bottom:2rem;left:2rem"
        >
          <h2 class="text-lg leading-none">
            {{ user.firstName }} {{ user.lastName }}
          </h2>
          <p class="opacity-50 italic text-sm">@{{ user.fullUsername }}</p>
        </div>
      </div> -->
    </div>

    <div class="bg-gray-700 rounded-xl p-3">
      <select
        v-model="selectedDevices.webcamId"
        class="my-1 w-full p-2 rounded-md bg-gray-900 text-gray-300"
      >
        <option
          v-for="d in devices.videoinput"
          :key="d.deviceId"
          :value="d.deviceId"
        >
          {{ d.label }}
        </option>
      </select>
      <select
        v-model="selectedDevices.micId"
        class="my-1 w-full p-2 rounded-md bg-gray-900 text-white"
      >
        <option
          v-for="d in devices.audioinput"
          :key="d.deviceId"
          :value="d.deviceId"
        >
          {{ d.label }}
        </option>
      </select>
      <select class="my-1 w-full p-2 rounded-md bg-gray-900 text-white">
        <option
          v-for="d in devices.audiooutput"
          :key="d.deviceId"
          :value="d.deviceId"
        >
          {{ d.label }}
        </option>
      </select>
    </div>

    <div class="flex flex-col items-center mt-8">
      <div v-if="!isFetchingDevices" class="mb-2">
        <span v-if="!webcam" class="text-red-700">
          We failed to capture your webcam.
        </span>
        <span v-if="!mic" class="text-red-700">
          We failed to capture your microphone.
        </span>
      </div>

      <d-btn
        @click="join"
        type="button"
        variant="primary-outline"
        :disabled="!webcamAndMic"
      >
        {{ isStarting ? "Start episode" : "Join episode" }}
      </d-btn>
      <d-btn @click="$router.push('/')" type="button" variant="simple"
        >Cancel</d-btn
      >
    </div>
  </div>
</template>

<script>
import API from "@/api";

export default {
  props: {
    episode: Object,
    isStarting: false
  },

  data: () => ({
    isFetchingDevices: true,
    selectedDevices: {
      webcamId: "",
      micId: ""
    },
    devices: {
      videoinput: [],
      audioinput: [],
      audiooutput: []
    },
    checkDevicesInterval: null
  }),

  async created() {
    await this.enumerateDevices();
    await this.getLocalStreams();
    this.checkDevicesInterval = setInterval(this.enumerateDevices, 1000);
    this.isFetchingDevices = false;
  },

  beforeDestroy() {
    clearInterval(this.checkDevicesInterval);
  },

  computed: {
    webcamAndMic() {
      return !!this.webcam && this.mic;
    },

    webcam() {
      return this.$store.state.room.localStreams.webcam;
    },

    mic() {
      return this.$store.state.room.localStreams.mic;
    },

    user() {
      return this.$store.state.user.userProfile;
    }
  },

  watch: {
    "$store.state.room.localStreams.webcam"(stream) {
      if (stream) this.$refs.video.srcObject = stream;
    },

    "selectedDevices.webcamId"(deviceId) {
      this.$store.dispatch("room/getWebcamStream", { deviceId });
    },

    "selectedDevices.micId"(deviceId) {
      this.$store.dispatch("room/getMicStream", { deviceId });
    }
  },

  methods: {
    async getLocalStreams() {
      await this.$store.dispatch(
        "room/getWebcamStream",
        this.selectedDevices.webcamId
      );
      await this.$store.dispatch(
        "room/getMicStream",
        this.selectedDevices.micId
      );
    },

    async enumerateDevices() {
      const allDevices = {
        videoinput: [],
        audioinput: [],
        audiooutput: []
      };

      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.error("enumerateDevices() not supported.");
        return;
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      if (!devices || !devices.length) {
        console.error("Somehow, you have no devices connected at all");
        return;
      }

      for (const device of devices) {
        if (!this.selectedDevices.webcamId && device.kind === "videoinput") {
          this.selectedDevices.webcamId = device.deviceId;
        }
        if (!this.selectedDevices.micId && device.kind === "audioinput") {
          this.selectedDevices.micId = device.deviceId;
        }
        allDevices[device.kind].push(device);
      }

      Object.keys(allDevices).forEach(
        type => (this.devices[type] = allDevices[type])
      );
    },

    async join() {
      this.$store.dispatch("nav/hideModal");

      // Dispatch produce webcam and microphone
      await this.$store.dispatch("room/produceWebcam");
      await this.$store.dispatch("room/produceMic");
    }
  }
};
</script>

<style></style>
