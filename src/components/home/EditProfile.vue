<template>
  <form @submit.prevent="createPodcast" class="rounded-xl p-4 w-full text-left">
    <div class="flex items-center my-2">
      <i class="material-icons w-8 text-gray-700">account_circle</i>
      <div class="flex-grow">
        <d-input type="text" v-model="name" placeholder="Podcast name" />
      </div>
    </div>

    <div class="flex items-center my-2">
      <i class="material-icons w-8 text-gray-700">account_circle</i>
      <div class="flex-grow">
        <d-input type="text" v-model="name" placeholder="Username" />
      </div>
    </div>

    <div class="flex items-center my-2">
      <i class="material-icons w-8 text-gray-700">account_circle</i>
      <div class="flex-grow">
        <d-input type="text" v-model="name" placeholder="Bio" />
      </div>
    </div>

    <div class="flex items-center my-2">
      <i class="material-icons w-8 text-gray-700">account_circle</i>
      <div class="flex-grow">
        <d-input type="text" v-model="name" placeholder="Leap Link" />
      </div>
    </div>

    <div class="flex items-center my-2">
      <i class="material-icons w-8 text-gray-700">account_circle</i>
      <div class="flex-grow">
        <d-input type="text" v-model="name" placeholder="Instagram" />
      </div>
    </div>

    <div class="flex items-center my-2">
      <i class="material-icons w-8 text-gray-700">account_circle</i>
      <div class="flex-grow">
        <d-input type="text" v-model="name" placeholder="Twitter" />
      </div>
    </div>

    <div class="flex items-center my-2">
      <i class="material-icons w-8 text-gray-700">account_circle</i>
      <div class="flex-grow">
        <d-input type="text" v-model="name" placeholder="Date of Birth" />
      </div>
    </div>

    <small v-if="errors.general" class="text-red-500">
      {{ errors.general }}
    </small>
    <div class="flex flex-col justify-center items-center">
      <d-btn variant="primary" class="mt-2 w-1/4">
        Create
      </d-btn>
      <d-btn
        variant="simple"
        class="mt-2"
        @click="$store.commit('nav/SET_PROFILE_VIEW', 'profile')"
      >
        Cancel
      </d-btn>
    </div>
  </form>
</template>

<script>
import API from "@/api";

export default {
  data: () => ({
    name: "",
    description: "",
    hosts: [],
    errors: {
      general: ""
    }
  }),

  methods: {
    addHost(e) {
      //check to see if the host is already within the array before adding
      this.hosts.push(e);
    },

    removeHost(index) {
      this.hosts.splice(index, 1);
    },

    async createPodcast() {
      const { ok, error, data } = await API.podcast.create({
        name: this.name,
        hosts: this.hosts
      });

      if (!ok) {
        this.errors.general = error;
        return;
      }

      this.$store.commit("user/ADD_PODCAST", data);
      this.$store.commit("nav/SET_HOME_VIEW", "home");
    }
  }
};
</script>

<style></style>
