<template>
  <div
    class="flex flex-col h-full bg-gray-700 p-2 rounded-lg text-gray-400 text-center"
    style="width:25rem"
  >
    <h2 class="pt-4 pb-2 border-b-2 border-gray-600">
      Live audience
    </h2>
    <ul class="flex flex-wrap p-3">
      <li
        v-for="socketId in Object.keys($store.state.chat.users)"
        :key="socketId"
        class="flex flex-col items-center w-12 mr-2"
      >
        <div class="relative h-12 w-12">
          <d-profile-image class="w-full h-full" />
          <span
            v-if="$store.state.chat.users[socketId].isRequestingToJoinAsGuest"
            class="absolute bg-primary rounded-full p-1 material-icons text-sm text-yellow-500"
            style="bottom: -0.25rem; left: -0.25rem;"
          >
            waving_hand
          </span>
        </div>
        <p class="text-xs">
          {{ $store.state.chat.users[socketId].userProfile.firstName }}
        </p>
      </li>
    </ul>

    <h2 class="pt-4 pb-2 border-t-2 border-gray-600">Live Chats</h2>
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
    <div class="relative" style="height:3.5rem">
      <div class="w-full h-full">
        <textarea
          v-model="text"
          @keydown.prevent.enter="sendMessage"
          class="w-full h-full bg-gray-600 text-gray-300 text-xs p-2 rounded-lg"
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
