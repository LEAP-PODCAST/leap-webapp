<template>
  <div
    class="flex flex-col h-full bg-gray-700 rounded-lg text-gray-400 text-center"
    style="width:25rem"
  >
    <h2>Paticipants</h2>
    <ul class="p-3">
      <li
        v-for="socketId in Object.keys($store.state.chat.users)"
        :key="socketId"
        class="flex flex-col items-center w-12 h-12"
      >
        <d-profile-image class="w-full h-full" />
        <p class="text-xs">
          {{ $store.state.chat.users[socketId].userProfile.firstName }}
        </p>
      </li>
    </ul>

    <h2>Live Chats</h2>
    <div class="flex flex-col text-left flex-grow">
      <div
        class="flex-grow overflow-y-auto scrollbar relative"
        style="height:1px"
        ref="chat"
      >
        <ul class="list-style-none flex flex-col py-2">
          <ChatMessage
            v-for="(message, i) in $store.state.chat.messages"
            :key="i"
            :message="message"
          />
        </ul>
      </div>
    </div>
    <div class="relative bg-gray-600" style="height:3.5rem">
      <div class="w-full h-full">
        <textarea
          v-model="text"
          @keydown.prevent.enter="sendMessage"
          class="w-full h-full bg-gray-600 text-gray-300 text-xs p-1"
          placeholder="Enter a message..."
        ></textarea>
        <div class="absolute flex bottom-0 right-0 py-2 px-1 items-center">
          <d-btn
            @click="sendMessage"
            variant="primary"
            size="xs"
            :disabled="text.length > 256"
            class="text-xs px-2"
            >Send</d-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatMessage from "./chat/ChatMessage";
import ChatParticipant from "./chat/ChatParticipant";

export default {
  components: {
    ChatParticipant,
    ChatMessage
  },

  data: () => ({
    text: ""
  }),

  methods: {
    async doScroll() {
      await this.$nextTick();
      const chat = this.$refs.chat;
      if (!chat.scrollTo) {
        chat.scrollTop = chat.scrollHeight;
      } else {
        chat.scrollTo({
          top: chat.scrollHeight,
          left: 0,
          behavior: "smooth"
        });
      }
    },

    sendMessage() {
      if (!this.text) return;
      this.$store.dispatch("chat/sendMessage", this.text);
      this.text = "";
    }
  },

  watch: {
    "$store.state.chat.messages"() {
      this.doScroll();
    }
  }
};
</script>
