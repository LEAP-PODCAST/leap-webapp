<template>
  <div class="p-8">
    <div v-if="$store.state.nav.profileView === 'profile'">
      <div class="flex flex-col items-center mb-8">
        <d-profile-image :imgUrl="profile.avatarUrl" class="w-24 h-24" />
        <h2 class="font-semibold text-xl mt-4 leading-tight">
          {{ `${profile.firstName} ${profile.lastName}` }}
        </h2>
        <p class="opacity-50 font-thin">{{ "@" + profile.fullUsername }}</p>
        <p class="my-3 text-center">{{ profile.bio || "Add bio" }}</p>
        <d-btn
          variant="primary-outline"
          class="mt-2 w-1/3"
          @click="$store.commit('nav/SET_PROFILE_VIEW', 'edit-profile')"
        >
          Edit Profile
        </d-btn>
      </div>
      <!-- <p> following</p> -->
      <!-- <p>{{ user.followers }} followers</p> -->
      <div class="flex items-center justify-around ">
        <div class="flex items-center justify-center">
          <i class="fab fa-twitter text-xl text-blue-500 mr-1"></i>
          <p class="text-gray-600">{{ profile.socials.twitter }}</p>
        </div>

        <div class="flex items-center justify-center">
          <i class="fab fa-instagram text-xl text-blue-500 ml-2 mr-1"></i>
          <p class="text-gray-600">{{ profile.socials.instagram }}</p>
        </div>
      </div>

      <div class="border-t-2 border-gray-800 mt-4">
        <h2 class="opacity-50 text-sm mt-1">My Podcasts</h2>

        <ul class="flex items-center py-3 overflow-x-auto">
          <li
            class="mx-4"
            v-for="podcast in profile.podcasts"
            :key="podcast.id"
          >
            <button class="flex flex-col items-center justify-center h-30 w-30">
              <div class="flex justify-center items-center">
                <d-podcast-image class="w-16 h-16" />
              </div>
              <span class="text-sm font-semibold mt-1">{{ podcast.name }}</span>
            </button>
            <div class="flex justify-center items-center">
              <span
                class="text-sm underline leading-3 cursor-pointer"
                @click="editPodcast(podcast)"
                >edit</span
              >
            </div>
          </li>
          <li>
            <button
              @click="$store.commit('nav/SET_HOME_VIEW', 'create-podcast')"
              class="flex flex-col justify-center items-center h-14 w-14"
            >
              <div class="flex-grow flex justify-center items-center">
                <i
                  class="material-icons flex items-center justify-center bg-red-500 rounded-full mb-3 w-8 h-8 text-2xl "
                  >add</i
                >
              </div>

              <p class="text-xs text-red-500">
                CREATE PODCAST
              </p>
            </button>
          </li>
        </ul>
      </div>

      <div class="border-t-2 border-gray-800 mt-4">
        <h2 class="opacity-50 text-sm mt-1">Episodes</h2>
        <div v-for="(episode, i) in episodes" :key="i" class="flex flex-row">
          <img class="w-4" :src="user.image" alt="" />
          <p>{{ episode.title }}</p>
        </div>
      </div>
    </div>

    <div v-if="$store.state.nav.profileView === 'edit-profile'">
      <EditProfile :profile="$store.state.user.userProfile" />
    </div>
  </div>
</template>

<script>
import DPodcastImage from "../globals/DPodcastImage.vue";
import DProfileImage from "../globals/DProfileImage.vue";
import EditProfile from "@/components/home/EditProfile";
export default {
  components: { DProfileImage, DPodcastImage, EditProfile },

  props: {
    profile: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    episodes: []
  }),

  methods: {
    editPodcast(podcast) {
      this.$store.commit("user/EDIT_PODCAST", podcast);
      this.$store.commit("nav/SET_HOME_VIEW", "edit-podcast");
    }
  }
};
</script>

<style></style>
