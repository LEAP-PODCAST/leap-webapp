<template>
  <form
    @submit.prevent="createPodcast"
    class="bg-white rounded-xl p-4 w-full text-left"
  >
    <div class="flex items-center my-2">
      <i class="material-icons w-8 text-gray-700">account_circle</i>
      <div class="flex-grow">
        <d-input type="text" v-model="name" placeholder="Podcast name" />
      </div>
    </div>

    <div class="flex items-center my-2">
      <i class="material-icons w-8 text-gray-700">description</i>
      <div class="flex-grow">
        <textarea
          rows="3"
          v-model="description"
          placeholder="Description"
          class="w-full p-2"
        />
      </div>
    </div>

    <div class="flex items-center my-2">
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
          placeholder="Add hosts (type @username if they are on leap or simple add email)"
        />
      </div>
    </div>

    <small v-if="errors.general" class="text-red-500">
      {{ errors.general }}
    </small>
    <d-btn variant="primary" class="mt-2">
      Create
    </d-btn>
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
    }
  }
};
</script>

<style></style>
