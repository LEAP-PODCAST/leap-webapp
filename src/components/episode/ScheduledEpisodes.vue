<template>
  <div v-if="episodes.length">
    <h2 class="opacity-50 text-2xl font-thin mb-3">Upcoming</h2>
    <ul>
      <li
        v-for="episode in episodes"
        :key="episode.id"
        class="flex items-center my-1"
      >
        <div class="flex-grow">
          <h3 class="font-bold">
            {{ episode.name }}
          </h3>
          <p class="text-sm font-thin">
            {{ getFormattedTime(episode.startTime) }}
          </p>
        </div>
        <d-btn variant="primary-outline" class="px-6">
          Start episode
        </d-btn>
      </li>
    </ul>
  </div>
</template>

<script>
import API from "@/api";
import moment from "moment";

export default {
  data: () => ({
    episodes: []
  }),

  mounted() {
    this.getAllScheduledEpisodes();
  },

  methods: {
    async getAllScheduledEpisodes() {
      const { ok, data, error } = await API.podcast.getAllScheduledEpisodes();

      if (!ok) {
        console.error(error);
        return;
      }

      this.episodes = data;
    },

    getFormattedTime(time) {
      return moment(time).format("LLLL");
    }
  }
};
</script>

<style></style>
