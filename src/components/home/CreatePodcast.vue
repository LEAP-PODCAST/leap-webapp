<template>
  <form
    @submit.prevent="createPodcast"
    class="bg-white rounded-xl p-4 w-full text-left"
    style="max-width:450px"
  >
    <div class="flex items-center border-b-2 mb-4 pb-1">
      <div class="flex-grow">
        <d-input
          type="text"
          variant="white-underline"
          v-model="name"
          placeholder="Podcast Name"
        />
      </div>
    </div>

    <small v-if="errors.name" class="text-red-500">
      {{ errors.name }}
    </small>

    <div class="flex items-center border-b-2 mb-4 pb-1">
      <i class="material-icons w-8 text-gray-700">group_add</i>
      <div class="flex-grow">
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
          placeholder="Add Hosts or Producers"
        />
      </div>
    </div>

    <div class="flex items-center border-b-2 mb-4 pb-1">
      <i class="material-icons w-8 text-gray-700">description</i>
      <d-input
        type="text"
        variant="white-underline-small-placeholder"
        v-model="description"
        placeholder="Add Description"
        class="w-full"
      />
    </div>

    <small v-if="errors.description" class="text-red-500">
      {{ errors.description }}
    </small>
    <div class="flex justify-center items-center">
      <d-btn variant="primary" class="mt-2 w-1/4">
        Create
      </d-btn>
      <d-btn
        variant="simple-black"
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

const regex = {
  nameWithSpaces: /^([A-Za-z ])+$/
};

export default {
  data: () => ({
    name: "",
    description: "",
    hosts: [],
    errors: {
      name: "",
      description: ""
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

    verifyPodcastName() {
      if (!this.name.length) {
        return (this.errors.name = "Podcast name is required.");
      }
      if (!regex.nameWithSpaces.test(this.name)) {
        return (this.errors.name =
          "Podcast name must only contain alphabetic characters.");
      }
      if (this.name.length > 20) {
        return (this.errors.name =
          "Podcast name must be 20 characters or less.");
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
      this.errors.general = "";
    },

    async createPodcast() {
      this.verifyPodcastName();
      this.verifyDescription();

      if (!!this.errors.general) {
        return;
      }

      const { ok, error, data } = await API.podcast.create({
        name: this.name,
        hosts: this.hosts
      });

      //this should come up as a notification
      //failed to create podcast due to ...
      // if (!ok) {
      //   this.errors.general = error;
      //   return;
      // }

      this.$store.commit("user/ADD_PODCAST", data);
      this.$store.commit("nav/SET_HOME_VIEW", "home");
    }
  }
};
</script>

<style></style>
