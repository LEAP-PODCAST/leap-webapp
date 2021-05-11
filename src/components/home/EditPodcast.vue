<template>
  <form
    @submit.prevent="submitPodcast"
    class="flex flex-col flex-grow justify-center rounded-xl p-4 w-full text-left"
  >
    <div class="flex flex-col items-center mb-8">
      <d-podcast-image class="w-24 h-24" />
      <label
        class="text-gray-200 text-sm mt-1 underline cursor-pointer"
        for="myfile"
        >Change Photo</label
      >
      <input class="hidden" type="file" id="myfile" name="myfile" />
    </div>

    <div class="flex items-center mb-4">
      <div class="flex-grow">
        <d-input
          type="text"
          placeholder="Podcast Name"
          variant="secondary"
          v-model="podcast.name"
        />
      </div>
    </div>
    <small v-if="errors.name" class="text-red-500">
      {{ errors.name }}
    </small>

    <div class="flex items-center mb-4">
      <div class="flex-grow">
        <d-input
          type="text"
          placeholder="Description"
          variant="secondary"
          v-model="podcast.description"
        />
      </div>
    </div>
    <small v-if="errors.description" class="text-red-500">
      {{ errors.description }}
    </small>

    <div class="flex flex-col flex-grow">
      <ul v-if="podcast.hosts.length" class="flex flex-wrap pb-1">
        <li
          v-for="(host, i) in podcast.hosts"
          :key="i"
          class="py-1 rounded-full m-1"
        >
          <div class="text-black btn-primary rounded-full p-1">
            <span class="p-1">
              {{ host.fullUsername || host.email }}
            </span>

            <i
              @click="() => removeHost(i)"
              class="material-icons text-sm ml-2 cursor-pointer text-black"
            >
              close
            </i>
          </div>
        </li>
      </ul>
      <d-user-search
        @clickUser="addHost"
        placeholder="Add Hosts or Producers"
        variant="primary"
      />
    </div>

    <div class="flex flex-col justify-center items-center">
      <d-btn variant="primary" class="mt-2 w-1/3">
        Save
      </d-btn>
      <d-btn
        variant="simple"
        class="mt-2"
        @click="$store.commit('nav/SET_HOME_VIEW', 'home')"
      >
        Cancel
      </d-btn>
    </div>
  </form>
</template>

<script>
import API from "@/api";
import DPodcastImage from "../globals/DPodcastImage.vue";

const regex = {
  nameWithSpaces: /^([A-Za-z ])+$/
};

export default {
  components: {
    DPodcastImage
  },

  data: () => ({
    errors: {
      name: "",
      description: ""
    }
  }),

  //The problem is that the value of the podcast is being changed by the inputs
  //I need a way to set the podcast value in EditPodcast, manipulate it and thenify
  //send it off to the store
  //but I also need a way to listen for the editPodcast value to change...
  //I don't understand why editPodcast is what's rendering on the profile side
  computed: {
    podcast() {
      let podcast = this.$store.state.user.editPodcast;
      podcast.description = "";
      return podcast;
    }
  },

  methods: {
    addHost(e) {
      //check to see if the host is already within the array before adding
      this.podcast.hosts.push(e);
    },

    removeHost(index) {
      this.podcast.hosts.splice(index, 1);
    },

    verifyPodcastName() {
      if (!this.podcast.name.length) {
        return (this.errors.name = "Podcast name is required.");
      }
      if (!regex.nameWithSpaces.test(this.podcast.name)) {
        return (this.errors.name =
          "Podcast name must only contain alphabetic characters.");
      }
      if (this.podcast.name.length > 20) {
        return (this.errors.name =
          "Podcast name must be 20 characters or less.");
      }
      this.errors.name = "";
    },

    verifyDescription() {
      if (!this.podcast.description.length) {
        return (this.errors.description = "Description is required.");
      }
      if (this.podcast.description.length > 500) {
        return (this.errors.description =
          "Description must be 500 characters or less.");
      }
      this.errors.description = "";
    },
    async submitPodcast() {
      this.verifyPodcastName();
      this.verifyDescription();
      if (!!this.errors.name || !!this.errors.description) {
        return;
      }

      this.$store.commit("nav/SET_HOME_VIEW", "home");
    }
  }
};
</script>

<style></style>
