<template>
  <form
    @submit.prevent="createPodcast"
    class="bg-white rounded-xl text-gray-700 p-4 w-full text-left"
  >
    <d-input type="text" v-model="name" placeholder="Podcast name" />

    <div class="flex items-center my-2">
      <i class="material-icons w-8">group_add</i>
      <div class="flex-grow">
        <ul v-if="hosts.length" class="flex flex-wrap p-2">
          <li
            v-for="(host, i) in hosts"
            :key="i"
            class="py-1 px-3 bg-gray-400 rounded-full m-1"
          >
            <span>{{ host.fullUsername || host.email }}</span>
            <i
              @click="() => removeHost(i)"
              class="material-icons text-sm ml-2 cursor-pointer"
            >
              close
            </i>
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
    hosts: [],
    errors: {
      general: ""
    }
  }),

  methods: {
    addHost(e) {
      this.hosts.push(e);
    },

    removeHost(index) {
      this.hosts.splice(index, 1);
    },

    async createPodcast() {
      let hosts = [];

      if (this.hosts.length) {
        hosts = this.hosts;
      }

      hosts.push(this.$store.state.user.userProfile.username);

      const { ok, error, data } = await API.podcast.create({
        name: this.name,
        hosts
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
