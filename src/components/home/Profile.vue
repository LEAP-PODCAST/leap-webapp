<template>
  <div class="p-8">
    <div class="flex flex-col items-center mb-8">
      <img
        :src="
          profile.avatar ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
        "
        class="rounded-full w-24 h-24"
      />
      <h2 class="font-bold text-lg mt-4 leading-tight">
        {{ `${profile.firstName} ${profile.lastName}` }}
      </h2>
      <p class="opacity-50 font-thin">{{ "@" + profile.fullUsername }}</p>
      <p class="my-3 text-center">{{ profile.bio || "No bio" }}</p>
    </div>
    <!-- <p> following</p> -->
    <!-- <p>{{ user.followers }} followers</p> -->

    <div class="">
      <h2 class="opacity-25 text-sm">My Podcasts</h2>
      <div v-if="profile.podcasts.length === 0" class="my-5 flex align-start">
        <div class="flex flex-col justify-center items-center">
          <i class="material-icons bg-red-500 rounded-full mb-4 w-1/4">add</i>
          <p class="text-xs text-red-500">CREATE PODCAST</p>
        </div>
      </div>

      <ul v-if="profile.podcasts.length" class="flex py-3">
        <li
          v-for="podcast in profile.podcasts"
          :key="podcast.id"
          class="flex flex-col items-center mr-2"
        >
          <i class="material-icons text-4xl">mic</i>
          <span>{{ podcast.name }}</span>
        </li>
      </ul>
    </div>

    <div>
      <h2 class="opacity-25 text-sm">Posts</h2>
      <div v-for="(post, i) in posts" :key="i" class="flex flex-row">
        <img class="w-4" :src="user.image" alt="" />
        <p>{{ post.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
