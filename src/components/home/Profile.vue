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

    <div v-if="profile.podcasts">
      <h2 class="opacity-25 text-sm">My Podcasts</h2>
      <!-- <div v-for="(podcast, i) in podcasts" :key="i" class="flex flex-row">
        <img class="w-5" :src="podcast.image" :alt="podcast.title" />
      </div> -->
    </div>

    <!-- <div>
        <h2>Posts</h2>
        <div v-for="(post, i) in posts" :key='i' class="flex flex-row">
            <img class="w-4" :src=user.image alt="">
            <p>{{post.title}}</p>
        </div>
    </div> -->
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
