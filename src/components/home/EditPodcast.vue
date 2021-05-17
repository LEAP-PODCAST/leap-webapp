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

    <div class="mb-4">
      <d-input
        type="text"
        placeholder="Podcast Name"
        variant="secondary"
        v-model="name"
      />
      <small v-if="errors.name" class="text-red-500">
        {{ errors.name }}
      </small>
    </div>

    <div class="mb-4">
      <d-input
        type="text"
        placeholder="Description"
        variant="secondary"
        v-model="description"
      />
      <small v-if="errors.description" class="text-red-500">
        {{ errors.description }}
      </small>
    </div>

    <div class="flex flex-col flex-grow">
      <ul v-if="hosts.length" class="flex flex-wrap pb-1">
        <li v-for="(host, i) in hosts" :key="i" class="py-1 rounded-full m-1">
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
        placeholder="Add or remove hosts"
        variant="primary"
      />
      <small v-if="errors.hosts" class="text-red-500">
        {{ errors.hosts }}
      </small>
    </div>

    <small v-if="errors.general" class="text-red-500">
      {{ errors.general }}
    </small>

    <div class="flex flex-col justify-center items-center">
      <d-btn variant="primary" class="mt-4">
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

export default {
  components: {
    DPodcastImage
  },

  data: () => ({
    name: "",
    description: "",
    hosts: [],

    errors: {
      name: "",
      description: "",
      hosts: "",
      general: ""
    }
  }),

  mounted() {
    this.name = this.podcast.name;
    this.description = this.podcast.description;
    this.hosts = this.podcast.hosts;
  },

  computed: {
    podcast() {
      const { podcasts } = this.$store.state.user.userProfile;
      const { podcastId } = this.$store.state.nav.homeViewData;
      return podcasts.find(({ id }) => id === podcastId);
    }
  },

  methods: {
    addHost(e) {
      if (!this.hosts.some(elem => e.username === elem.username)) {
        this.hosts.push(e);
      } else {
        this.errors.hosts = "Cannot add duplicate hosts";
      }
    },

    removeHost(index) {
      this.hosts.splice(index, 1);
    },

    verifyPodcastName() {
      if (!this.name.length) {
        return (this.errors.name = "Podcast name is required.");
      }
      if (this.name.length > 40) {
        return (this.errors.name =
          "Podcast name must be 40 characters or less.");
      }
      this.errors.name = "";
    },

    verifyDescription() {
      if (!this.description.length) {
        return (this.errors.description = "Description is required.");
      }
      if (this.description.length > 500) {
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

      const { ok, error, data } = await API.podcast.editPodcast({
        name: this.name,
        hosts: this.hosts,
        description: this.description,
        podcastId: this.podcast.id
      });

      if (!ok) {
        this.errors.general = error;
        return;
      }

      this.$store.commit("nav/SET_HOME_VIEW", "home");
    }
  }
};
</script>

<style></style>
