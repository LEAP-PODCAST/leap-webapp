<template>
  <form
    @submit.prevent="createPodcast"
    class="flex flex-col justify-center rounded-xl p-4 w-full text-left"
  >
    <div class="flex flex-col items-center mb-8">
      <d-profile-image
        :imgUrl="profile.avatarUrl"
        class="w-24 h-24 opacity-50"
      />
      <h1 class="text-gray-200 text-sm mt-1 underline">Change Photo</h1>
    </div>

    <div class="flex items-center my-2">
      <div class="flex-grow">
        <d-input
          type="text"
          placeholder="Name"
          variant="secondary"
          :value="`${profile.firstName} ${profile.lastName}`"
        />
      </div>
    </div>

    <!-- <div class="flex items-center my-2">
      <div class="flex-grow">
        <d-input
          type="text"
          placeholder="Username"
          variant="secondary"
          :value="`${profile.fullUsername}`"
        />
      </div>
    </div> -->

    <div class="flex items-center my-2">
      <div class="flex-grow">
        <d-input
          type="text"
          placeholder="Bio"
          variant="secondary"
          :value="`${profile.bio}`"
        />
      </div>
    </div>

    <!-- <div class="flex items-center my-2">
      <div class="flex-grow">
        <d-input
          type="text"
          v-model="name"
          placeholder="Leap Link"
          variant="secondary"
        />
      </div>
    </div> -->

    <div class="flex items-center my-2">
      <div class="flex-grow">
        <d-input
          type="text"
          v-model="name"
          placeholder="Instagram"
          variant="secondary"
        />
      </div>
    </div>

    <div class="flex items-center my-2">
      <div class="flex-grow">
        <d-input
          type="text"
          v-model="name"
          placeholder="Twitter"
          variant="secondary"
        />
      </div>
    </div>

    <div class="flex items-center my-2">
      <div class="flex-grow">
        <d-input
          type="text"
          v-model="name"
          placeholder="Date of Birth"
          variant="secondary"
        />
      </div>
    </div>

    <small v-if="errors.general" class="text-red-500">
      {{ errors.general }}
    </small>
    <div class="flex flex-col justify-center items-center">
      <d-btn variant="primary" class="mt-2 w-full">
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
import DProfileImage from "../globals/DProfileImage.vue";

export default {
  components: {
    DProfileImage
  },

  props: {
    profile: {
      type: Object,
      required: true
    }
  },

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
