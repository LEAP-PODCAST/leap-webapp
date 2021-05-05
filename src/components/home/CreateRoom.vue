<template>
  <div class="p-8 w-full h-full">
    <div
      v-if="$store.state.nav.homeView === 'home'"
      class="flex flex-col align-center w-full h-full justify-center"
    >
      <ScheduledEpisodes class="mb-12" />
      <div class="text-center">
        <span class="text-sm font-thin opacity-75">
          Good {{ timeOfDayText }},
          {{ $store.state.user.userProfile.firstName }}!
        </span>
        <h2 class="text-2xl">
          What would you like to do today?
        </h2>
      </div>
      <div class="flex flex-col items-center mt-8">
        <d-btn
          v-if="$store.state.user.userProfile.podcasts.length"
          @click="$store.commit('nav/SET_HOME_VIEW', 'schedule')"
          variant="primary"
          class="w-full"
        >
          New episode
        </d-btn>
        <d-btn
          v-else
          @click="$store.commit('nav/SET_HOME_VIEW', 'create-podcast')"
          variant="primary"
          class="w-1/4"
        >
          Create my podcast
        </d-btn>

        <small class="italic text-xs opacity-50 my-2">or</small>
        <d-btn @click="createRoom" variant="primary-outline" class="w-1/4">
          Create room
        </d-btn>
      </div>
    </div>

    <!-- Schedule a Podcast -->
    <div v-else-if="$store.state.nav.homeView === 'schedule'">
      <span class="text-sm font-thin opacity-75">
        Good {{ timeOfDayText }}, {{ $store.state.user.userProfile.firstName }}!
      </span>
      <h2 class="text-2xl">Let's schedule it ⚡</h2>
      <div class="flex justify-center items-center w-full my-4">
        <div
          class="p-btn flex justify-center inline-block font-bold px-6 rounded-full btn-primary py-2"
        >
          New Episode
          <i class="material-icons ml-3">videocam</i>
        </div>
        <button
          @click="$store.commit('nav/SET_HOME_VIEW', 'home')"
          class="text-xl p-2 ml-3 text-gray-300"
        >
          <i class="material-icons">clear</i>
        </button>
      </div>

      <div class="flex">
        <ScheduleEpisode />
      </div>
    </div>

    <!-- Create a Podcast -->
    <div
      v-else-if="$store.state.nav.homeView === 'create-podcast'"
      class="w-full h-full flex flex-col items-center justify-center"
    >
      <h2 class="text-xl opacity-75 font-thin">
        Ready to Create your Podcast?
      </h2>
      <h2 class="text-3xl mb-4">Let's Go!</h2>

      <div class="flex w-full justify-center mt-2">
        <CreatePodcast />
      </div>
    </div>

    <div v-else-if="$store.state.nav.homeView === 'join-room'">
      <ChooseDevices
        :episode="$store.state.nav.homeViewData.episode"
        :isStarting="true"
      />
    </div>
  </div>
</template>

<script>
import ScheduledEpisodes from "@/components/episode/ScheduledEpisodes";
import ScheduleEpisode from "@/components/episode/ScheduleEpisode";
import CreatePodcast from "@/components/home/CreatePodcast";
import ChooseDevices from "@/components/home/ChooseDevices";

export default {
  components: {
    ScheduledEpisodes,
    ScheduleEpisode,
    CreatePodcast,
    ChooseDevices
  },

  data: () => ({
    step: "home"
  }),

  computed: {
    timeOfDayText() {
      const hours = new Date().getHours();
      if (hours > 3 && hours < 13) return "morning";
      if (hours > 12 && hours < 18) return "aftenoon";
      return "evening";
    }
  },

  methods: {
    async createRoom() {
      // TODO this will be set on the server side
      const roomId = Math.random()
        .toString(36)
        .substr(2, 9);
      const res = await this.$store.dispatch("room/join", {
        roomId
      });
      if (!res) return;
      this.$router.push(`/room/${roomId}`);
    }
  }
};
</script>

<style lang="scss"></style>
