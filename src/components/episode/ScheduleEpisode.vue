<template>
  <div class="flex-grow bg-white rounded-xl text-gray-700 p-4 w-full text-left">
    <div class="flex items-center border-b-2 mb-4 pb-1">
      <d-input
        type="text"
        v-model="name"
        placeholder="Episode name"
        class="flex-grow"
        variant="white-underline"
      />
      <d-btn
        variant="no-padding"
        @click="$store.commit('nav/SET_HOME_VIEW', 'home')"
      >
        <i class="material-icons w-8 text-black-900">clear</i>
      </d-btn>
    </div>

    <div class="flex my-2 w-full border-b-2 mb-4 pb-1">
      <i class="material-icons w-8">mic</i>
      <label class="w-full">
        <div class="visually-hidden">
          Podcasts
        </div>
        <select class="w-full text-sm text-gray-600" v-model="podcastId">
          <option value="0">
            Choose Podcast
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

    <div class="flex items-center border-b-2 mb-4 pb-1">
      <i class="material-icons">access_time</i>

      <div class="flex text-left ml-3 w-full">
        <div class="mr-2 flex-grow">
          <d-datetime
            v-model="startTime"
            :min-date="today"
            :max-date="oneMonthFromToday"
            format="YYYY-MM-DD hh:mm a"
            label="Select a start time"
            :no-button-now="true"
            class="border-0"
          />
        </div>
        <div class="flex-grow">
          <d-datetime
            v-model="endTime"
            :min-date="startTime"
            :max-date="oneMonthFromToday"
            format="YYYY-MM-DD hh:mm a"
            label="Select a end time"
            :no-button-now="true"
          />
        </div>
      </div>
    </div>

    <div class="flex items-center border-b-2 mb-4 pb-1">
      <i class="material-icons w-8">group_add</i>
      <div class="flex-grow">
        <ul v-if="guests.length" class="flex flex-wrap p-2">
          <li
            v-for="(guest, i) in guests"
            :key="i"
            class="py-1 px-3 bg-gray-400 rounded-full m-1"
          >
            <span>{{ guest.fullUsername || guest.email }}</span>
            <i
              @click="() => removeGuest(i)"
              class="material-icons text-sm ml-2 cursor-pointer"
            >
              close
            </i>
          </li>
        </ul>
        <d-user-search
          @clickUser="addGuest"
          placeholder="Add guests (type @username if they are on leap or simple add email)"
        />
      </div>
    </div>

    <div class="flex items-center border-b-2 mb-4 pb-1">
      <i class="material-icons w-8">menu</i>
      <d-input
        type="text"
        v-model="description"
        placeholder="Description"
        class="flex-grow"
        variant="white-underline-small-placeholder"
      />
    </div>

    <div class="flex mb-4">
      <i class="material-icons w-8">public</i>
      <label class="block w-full">
        <div class="visually-hidden">
          Visibility
        </div>
        <select v-model="visibility" class="w-full text-gray-600 text-sm">
          <option :value="0">Private</option>
          <option :value="1">Public</option>
        </select>
      </label>
    </div>

    <div class="flex border-b-2 mb-4 pb-4">
      <i class="material-icons w-8">notifications_none</i>
      <label class="block w-full">
        <div class="visually-hidden">
          Alert notification
        </div>
        <select v-model="timeToAlert" class="w-full text-gray-600 text-sm">
          <option :value="15">15 minutes before</option>
          <option :value="30">30 minutes before</option>
          <option :value="60">1 hour before</option>
          <option :value="120">2 hours before</option>
        </select>
      </label>
    </div>

    <small v-if="errors.general" class="text-red-500">
      {{ errors.general }}
    </small>

    <div class="flex justify-center pt-4">
      <d-btn variant="primary-outline" class="mr-2 " @click="startEpisode">
        Start now
      </d-btn>
      <d-btn @click="schedulePodcast" variant="primary" class="">
        Next
      </d-btn>
    </div>
  </div>
</template>

<script>
import API from "@/api";
import DUserSearch from "../globals/DUserSearch.vue";

export default {
  components: { DUserSearch },

  data: () => ({
    name: "",
    podcastId: 0,
    startTime: "",
    endTime: "",
    guests: [],
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
    addGuest(e) {
      this.guests.push(e);
    },

    removeGuest(index) {
      this.guests.splice(index, 1);
    },

    async startEpisode() {
      const res = await this.schedulePodcast();
      if (!res.ok) return;

      const { ok, error, data } = await API.episode.start({
        podcastId: res.data.podcastId,
        episodeId: res.data.id
      });

      if (!ok) {
        alert(error);
        return;
      }

      this.$router.push(`/${data.podcast.urlName}/${data.episode.urlName}`);
    },

    async schedulePodcast() {
      const res = await API.podcast.createScheduledEpisode({
        name: this.name,
        podcastId: this.podcastId,
        startTime: new Date(this.startTime).toString(),
        endTime: new Date(this.endTime).toString(),
        guests: [],
        description: this.description,
        visibility: this.visibility,
        timeToAlert: this.timeToAlert
      });

      if (!res.ok) {
        this.errors.general = res.error;
        return res;
      }

      this.$store.commit("nav/SET_HOME_VIEW", "home");
      return res;
    }
  }
};
</script>

<style></style>
