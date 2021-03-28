<template>
  <form @submit.prevent="createPodcast">
    <d-input type="text" v-model="name" label="Podcast name" />
    <d-input
      type="text"
      v-model="hosts"
      label="Hosts (seperate by commas with no spaces)"
    />
    <d-btn variant="primary">Create</d-btn>
  </form>
</template>

<script>
export default {
  data: () => ({
    name: "",
    hosts: ""
  }),

  methods: {
    createPodcast() {}
  }
};
</script>

<style></style>
