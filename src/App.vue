<template>
  <div id="app" class="w-screen h-screen">
    <div v-if="!$store.state.user.isVerifyingToken" class="w-screen h-screen">
      <d-context-menu />

      <Landing v-if="$route.path === '/' && !isLoggedIn" />

      <SimpleHeader v-else-if="this.paths.includes($route.path)">
        <router-view></router-view>
      </SimpleHeader>

      <MainWrapper v-else class="w-full h-full">
        <router-view></router-view>
      </MainWrapper>

      <DModal />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import MainWrapper from "@/components/layout/MainWrapper";
import DModal from "@/components/DModal";
import Landing from "@/components/Landing";
import SimpleHeader from "@/components/layout/SimpleHeader";

export default {
  data: () => ({
    paths: [
      "/LogIn",
      "/GuestLogin",
      "/NewPassword",
      "/PasswordReset",
      "/SignUp"
    ]
  }),
  components: {
    DModal,
    MainWrapper,
    Landing,
    SimpleHeader
  },

  computed: {
    ...mapGetters("user", ["isLoggedIn"])
  },

  mounted() {
    this.$store.dispatch("user/verifyToken");
  }
};
</script>

<style lang="scss">
.tooltip {
  // ...

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}
</style>
