<template>
  <div class="p-8">
    <div v-if="$store.state.nav.profileView === 'profile'">
      <div class="flex flex-col items-center mb-8">
        <d-profile-image :imgUrl="profile.avatarUrl" class="w-24 h-24" />
        <h2 class="font-bold text-lg mt-4 leading-tight">
          {{ `${profile.firstName} ${profile.lastName}` }}
        </h2>
        <p class="opacity-50 font-thin">{{ "@" + profile.fullUsername }}</p>
        <p class="my-3 text-center">{{ profile.bio || "No bio" }}</p>
        <d-btn
          variant="primary-outline"
          class="mt-2 w-1/4"
          @click="$store.commit('nav/SET_PROFILE_VIEW', 'edit-profile')"
        >
          Edit Profile
        </d-btn>
      </div>
      <!-- <p> following</p> -->
      <!-- <p>{{ user.followers }} followers</p> -->

      <div>
        <h2 class="opacity-25 text-sm">My Podcasts</h2>

        <ul class="flex items-center py-3">
          <li v-for="podcast in profile.podcasts" :key="podcast.id">
            <button
              class="flex flex-col items-center justify-center mr-4 h-32 w-32"
            >
              <div class="flex-grow flex justify-center items-center">
                <d-profile-image class="w-16 h-16" />
              </div>
              <span>{{ podcast.name }}</span>
            </button>
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

      <div>
        <h2 class="opacity-25 text-sm">Episodes</h2>
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
import DProfileImage from "../globals/DProfileImage.vue";
import EditProfile from "@/components/home/EditProfile";
export default {
  components: { DProfileImage, EditProfile },

  props: {
    profile: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    episodes: []
  })
};
</script>

<style></style>
