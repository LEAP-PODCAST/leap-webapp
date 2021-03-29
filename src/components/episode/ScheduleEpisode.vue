<template>
  <div class="bg-white rounded-xl text-gray-700 p-4 w-full text-left">
    <d-input type="text" v-model="name" label="Episode name" />

    <div class="flex my-2">
      <i class="material-icons">mic</i>
      <label>
        <div class="visually-hidden">
          Podcasts
        </div>
        <select class="w-full" v-model="podcastId">
          <option value="0">
            Select a Podcast
          </option>
          <option
            v-for="podcast in $store.state.user.userProfile.podcasts"
            :key="podcast.id"
            :value="podcast.id"
          >
            {{ podcast.name }}
          </option>
        </select>
      </label>
    </div>

    <div class="flex items-center">
      <i class="material-icons">access_time</i>
      <div class="text-left ml-3 w-full">
        <!-- <div>
          <span class="mr-8">Tue, Feb 16</span>
          <span>9:30am - 10:30am</span>
        </div> -->
        <div class="mt-1">
          <d-datetime
            v-model="startTime"
            :min-date="today"
            :max-date="oneMonthFromToday"
            format="YYYY-MM-DD hh:mm a"
            label="Select an start time"
            :no-button-now="true"
          />
        </div>
        <div class="my-2">
          <d-datetime
            v-model="endTime"
            :min-date="startTime"
            :max-date="oneMonthFromToday"
            format="YYYY-MM-DD hh:mm a"
            label="Select an end time"
            :no-button-now="true"
          />
        </div>
      </div>
    </div>

    <d-input type="text" v-model="guests" label="Add guests" />
    <d-input type="text" v-model="description" label="Description" />

    <div class="flex my-2">
      <i class="material-icons">public</i>
      <label class="block">
        <div class="visually-hidden">
          Visibility
        </div>
        <select v-model="visibility" class="w-full">
          <option value="0">Private</option>
          <option value="1">Public</option>
        </select>
      </label>
    </div>

    <div class="flex my-2">
      <i class="material-icons">notifications_none</i>
      <label class="block">
        <div class="visually-hidden">
          Alert notification
        </div>
        <select v-model="timeToAlert" class="w-full">
          <option value="15">15 minutes before</option>
          <option value="30">30 minutes before</option>
          <option value="60">1 hour before</option>
          <option value="120">2 hours before</option>
        </select>
      </label>
    </div>

    <small v-if="errors.general" class="text-red-500">
      {{ errors.general }}
    </small>

    <div class="flex justify-center pt-4">
      <d-btn variant="primary-outline" class="mr-2 px-3">
        Start now
      </d-btn>
      <d-btn @click="schedulePodcast" variant="primary" class="px-3">
        Next
      </d-btn>
    </div>
  </div>
</template>

<script>
import API from "@/api";

export default {
  data: () => ({
    name: "",
    podcastId: 0,
    startTime: "",
    endTime: "",
    guests: "",
    description: "",
    visibility: 0,
    timeToAlert: 30,

    errors: {
      general: ""
    }
  }),

  computed: {
    today() {
      const d = new Date();
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    },

    oneMonthFromToday() {
      const d = new Date(Date.now() + 2629800000);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
  },

  methods: {
    async schedulePodcast() {
      console.log(this.startTime);
      console.log(this.endTime);

      const res = await API.podcast.createScheduledEpisode({
        name: this.name,
        podcastId: 1,
        startTime: new Date(this.startTime).toString(),
        endTime: new Date(this.endTime).toString(),
        guests: [],
        description: this.description,
        visibility: this.visibility,
        timeToAlert: this.timeToAlert
      });

      if (!res.ok) {
        this.errors.general = res.error;
        return;
      }
    }
  }
};
</script>

<style></style>
