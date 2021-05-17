<template>
  <div class="w-full">
    <d-input
      type="text"
      :variant="variant"
      v-model="search"
      :placeholder="placeholder"
    />
    <ul class="bg-gray-400 w-full">
      <button
        v-for="(result, i) in results"
        :key="i"
        @click="() => clickUser(result)"
        class="w-full text-left"
      >
        <li v-if="result.type === 'user'" class="search-result">
          {{ result.fullUsername }}
        </li>
        <li v-if="result.type === 'email'" class="search-result">
          {{ result.email }}
        </li>
      </button>
      <li v-if="search.length && error.length" class="p-2">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import API from "@/api";

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export default {
  data: () => ({
    search: "",
    results: [],
    error: ""
  }),

  props: {
    placeholder: String,
    variant: String
  },

  methods: {
    async searchUsernames() {
      if (!this.search.length) {
        this.results = [];
        return;
      }

      if (/^@/.test(this.search)) {
        const res = await API.profiles.search(
          this.search.substr(1, this.search.length)
        );
        this.results = res.data.map(user => ({
          type: "user",
          ...user
        }));
        this.error = "";
        return;
      }

      if (emailRegex.test(this.search)) {
        this.error = "";
        this.results = [{ type: "email", email: this.search }];
        return;
      }

      this.results = [];
      this.error = "Not a valid user search or email";
    },

    clickUser(result) {
      this.$emit("clickUser", result);
      this.search = "";
    }
  },

  watch: {
    search() {
      this.searchUsernames();
    }
  }
};
</script>

<style lang="scss" scoped>
.search-result {
  padding: 0.5rem;

  &:hover {
    background: #b8b8b8;
  }
}
</style>
