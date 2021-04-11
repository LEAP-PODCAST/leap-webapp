<template>
  <li class="flex text-xs px-2 text-gray-300 my-1">
    <d-profile-image class="w-6 h-6 mr-2 mt-2" />
    <div>
      <h3 class="text-xs font-bold">{{ fullUsername }}</h3>
      <p
        v-if="type === 'message'"
        class="text-xs break-words"
        v-html="computedMessage"
      />
      <p
        v-else-if="type === 'action'"
        class="text-xs break-words opacity-75 italic"
        v-html="computedMessage"
      />
      <img
        v-else-if="type === 'img'"
        :src="computedMessage"
        class="w-full rounded-md"
      />
    </div>
  </li>
</template>

<script>
const urlRegex = /(https?:\/\/)?(\w+(\.\w{2,})+(\/\S+)?)/g;
const imgUrlRegex = /^(https:\/\/)(\S+\.\S{2,}\.(png|jpg|jpeg|gif|webp|svg))((\/|\?)\S+)?$/;

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    type: "message",
    fullUsername: ""
  }),

  mounted() {
    this.fullUsername = this.users[
      this.message.socketId
    ].userProfile.fullUsername;
  },

  computed: {
    users() {
      return this.$store.state.chat.users;
    },

    // TODO SANITIZE THIS FOR XSS
    computedMessage() {
      const { text } = this.message;

      if (this.message.type === "action") {
        this.type = "action";
        return text;
      }

      if (imgUrlRegex.test(text)) {
        this.type = "img";
        return text;
      }

      let match;
      let out = text;
      while ((match = urlRegex.exec(text))) {
        const [full, protocol = "http://", url] = match;
        const href = protocol + url;
        out = out.replace(
          full,
          `<a href="${href}" class="text-gray-300 underline" target="_blank">${url}</a>`
        );
      }

      this.type = "message";

      return out;
    }
  }
};
</script>

<style></style>
