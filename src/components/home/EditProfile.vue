<template>
  <form
    @submit.prevent="editProfile"
    class="flex flex-col justify-center rounded-xl p-4 w-full text-left"
  >
    <div class="flex flex-col items-center mb-8">
      <d-profile-image :imgUrl="avatarUrl" class="w-24 h-24 opacity-50" />
      <label
        class="text-gray-200 text-sm mt-1 underline cursor-pointer"
        for="myfile"
        >Change Photo</label
      >
      <input class="hidden" type="file" id="myfile" name="myfile" />
    </div>

    <div class="flex justify-between">
      <div class="flex flex-col flex-grow mr-2 my-2">
        <div class="flex-grow">
          <d-input
            type="text"
            placeholder="First Name"
            v-model="firstName"
            variant="secondary"
          />
        </div>
        <small v-if="errors.firstName" class="text-red-500">
          {{ errors.firstName }}
        </small>
      </div>

      <div class="flex flex-col flex-grow">
        <div class="flex flex-grow my-2">
          <div class="flex-grow">
            <d-input
              type="text"
              placeholder="Last Name"
              v-model="lastName"
              variant="secondary"
            />
          </div>
        </div>
        <small v-if="errors.lastName" class="text-red-500">
          {{ errors.lastName }}
        </small>
      </div>
    </div>

    <div class="flex items-center my-2">
      <div class="flex-grow">
        <d-input
          type="text"
          placeholder="Bio"
          variant="secondary"
          v-model="bio"
        />
      </div>
    </div>
    <small v-if="errors.bio" class="text-red-500">
      {{ errors.bio }}
    </small>

    <div class="flex justify-between">
      <div class="flex flex-col flex-grow flex-wrap mr-2 my-2">
        <div class="">
          <d-input
            type="text"
            placeholder="Twitter"
            v-model="twitter"
            variant="secondary"
          />
        </div>
        <small v-if="errors.socials.twitter" class="text-red-500">
          {{ errors.socials.twitter }}
        </small>
      </div>

      <div class="flex flex-col flex-grow flex-wrap my-2">
        <div class="flex-grow">
          <d-input
            type="text"
            placeholder="Instagram"
            v-model="instagram"
            variant="secondary"
          />
        </div>
        <small v-if="errors.socials.instagram" class="text-red-500">
          {{ errors.socials.instagram }}
        </small>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center">
      <d-btn variant="primary" class="mt-2 w-full">
        Save
      </d-btn>
      <d-btn
        variant="simple"
        class="mt-2"
        @click="$store.commit('nav/SET_PROFILE_VIEW', 'profile')"
      >
        Cancel
      </d-btn>
    </div>
  </form>
</template>

<script>
import API from "@/api";
import DProfileImage from "../globals/DProfileImage.vue";

const regex = {
  nameWithSpaces: /^([A-Za-z ])+$/,
  name: /^[A-Za-z]+$/,
  twitter: /^(\w){1,15}$/,
  instagram: /^(\w){1,32}$/
};

export default {
  components: {
    DProfileImage
  },

  data: () => ({
    firstName: "",
    lastName: "",
    bio: "",
    twitter: "",
    instagram: "",
    avatarUrl: "",
    errors: {
      firstName: "",
      lastName: "",
      bio: "",
      socials: {
        twitter: "",
        instagram: ""
      }
    }
  }),

  created() {
    const { userProfile } = this.$store.state.user;
    this.firstName = userProfile.firstName;
    this.lastName = userProfile.lastName;
    this.bio = userProfile.bio;
    this.avatarUrl = userProfile.avatarUrl;
    if (userProfile.socials.twitter) {
      this.twitter = userProfile.socials.twitter;
    }
    if (userProfile.socials.instagram) {
      this.instagram = userProfile.socials.instagram;
    }
  },

  methods: {
    verfiyFirstName() {
      if (!this.firstName.length) {
        return (this.errors.firstName = "First name is requried.");
      }
      if (!regex.name.test(this.firstName)) {
        return (this.errors.firstName =
          "First name must only contain alphabetic characters.");
      }
      if (this.firstName.length > 20) {
        return (this.errors.firstName =
          "First name must be 20 characters or less.");
      }
      this.errors.firstName = "";
    },

    verifyLastName() {
      if (!this.lastName.length) {
        return (this.errors.lastName = "Last name is required.");
      }
      if (!regex.name.test(this.lastName)) {
        return (this.errors.lastName =
          "Last name must only contain alphabetic characters.");
      }
      if (this.lastName.length > 20) {
        return (this.errors.lastName =
          "Last name must be 20 characters or less.");
      }
      this.errors.lastName = "";
    },

    verfiyBio() {
      if (!this.bio.length) {
        return (this.errors.name = "Bio is requried.");
      }
      if (this.bio.length > 500) {
        return (this.errors.name = "Name must be 500 characters or less.");
      }
      this.errors.bio = "";
    },

    verifyTwitter() {
      if (this.twitter.length > 0 && !regex.twitter.test(this.twitter)) {
        return (this.errors.socials.twitter =
          "The Twitter handle contains errors. Please try again.");
      }
      this.errors.socials.twitter = "";
    },

    verifyInstagram() {
      if (this.instagram.length > 0 && !regex.instagram.test(this.instagram)) {
        return (this.errors.socials.instagram =
          "The instagram handle contains errors. Please try again.");
      }
      this.errors.socials.instagram = "";
    },

    async editProfile() {
      this.verfiyFirstName();
      this.verifyLastName();
      this.verfiyBio();
      this.verifyTwitter();
      this.verifyInstagram();

      if (
        !!this.errors.firstName ||
        !!this.errors.lastName ||
        !!this.errors.bio ||
        !!this.errors.socials.twitter ||
        !!this.errors.socials.instagram
      ) {
        return;
      }

      const socials = {
        instagram: this.instagram,
        twitter: this.twitter
      };

      const { ok, error, data } = await API.user.editProfile({
        firstName: this.firstName,
        lastName: this.lastName,
        bio: this.bio,
        socials: socials
      });

      if (!ok) {
        // TODO better notification system
        alert(error);
        return;
      }
      this.$store.commit("nav/SET_PROFILE_VIEW", "profile");
      this.$store.commit("user/EDIT_PROFILE", data);
    }
  }
};
</script>

<style></style>
