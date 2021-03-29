<template>
  <form @submit.prevent="createPodcast">
    <d-input type="text" v-model="name" label="Podcast name" class="mb-2" />
    <d-input
      type="text"
      v-model="hosts"
      label="Hosts (seperate by commas with no spaces)"
    />
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
    hosts: "",
    errors: {
      general: ""
    }
  }),

  methods: {
    async createPodcast() {
      let hosts = [];

      if (this.hosts.length) {
        hosts = this.hosts.split(",");
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
