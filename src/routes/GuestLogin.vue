<template>
  <div
    class="p-8 bg-gray-900 text-white rounded-lg w-full"
    style="max-width:600px"
  >
    <div class="md:flex justify-between items-center mb-5">
      <h1 v-if="step === 0" class="text-2xl font-bold">Guest Login</h1>
      <h1 v-else-if="step === 1" class="text-2xl font-bold">
        Almost There!
      </h1>
      <div class="md:flex flex-col">
        <p class="text-sm font-thin mr-2 opacity-50">
          Step {{ step + 1 }} of 2
        </p>
        <button v-if="step > 0" @click="step--" class="text-xs opacity-25">
          &lt; go back
        </button>
      </div>
    </div>

    <form @submit.prevent="toStep1" v-if="step === 0">
      <d-input
        type="text"
        v-model="email"
        placeholder="Email"
        @blur="verifyEmail"
        required
      />
      <small v-if="errors.email" class="text-red-500">
        {{ errors.email }}
      </small>

      <d-btn type="submit" variant="primary" class="mt-6 w-full">
        Continue
      </d-btn>
    </form>

    <form @submit.prevent="signUp" v-if="step === 1">
      <div>
        <d-input
          type="text"
          v-model="firstName"
          @blur="verfiyFirstName"
          placeholder="First Name"
          required
        />
        <small v-if="errors.firstName" class="text-red-500">
          {{ errors.firstName }}
        </small>
      </div>

      <div class="mt-4">
        <d-input
          type="text"
          v-model="lastName"
          @blur="verifyLastName"
          placeholder="Last Name"
          required
        />
        <small v-if="errors.lastName" class="text-red-500">
          {{ errors.lastName }}
        </small>
      </div>

      <div class="mt-4">
        <d-input
          type="text"
          v-model="heading"
          placeholder="Heading"
          @blur="verifyHeading"
          required
        />
        <small v-if="errors.heading" class="text-red-500">
          {{ errors.heading }}
        </small>
      </div>

      <d-btn type="submit" variant="primary" class="mt-6 w-full">
        Continue
      </d-btn>
    </form>
  </div>
</template>

<script>
const regex = {
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  name: /^[A-Za-z]+$/,
  nameWithSpaces: /^([A-Za-z ])+$/
};

export default {
  data: () => ({
    step: 0,
    firstName: "",
    lastName: "",
    email: "",
    heading: "",
    receiveNotifications: true,

    errors: {
      firstName: "",
      lastName: "",
      email: "",
      heading: ""
    }
  }),

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

    verifyHeading() {
      if (!this.heading.length) {
        return (this.errors.heading = "Heading is required.");
      }
      if (!regex.name.test(this.heading)) {
        return (this.errors.heading =
          "Heading must only contain alphabetic characters.");
      }
      if (this.heading.length > 20) {
        return (this.errors.heading = "Heading must be 20 characters or less.");
      }
      this.errors.Heading = "";
    },

    async verifyEmail() {
      if (!this.email.length) {
        return (this.errors.email = "Email is required.");
      }
      if (!regex.email.test(this.email)) {
        return (this.errors.email = "That email appears to be invalid.");
      }
      if (this.email.length > 32) {
        return (this.errors.email = "Email must be 32 characters or less.");
      }
      // TODO check if email is available
      this.errors.email = "";
    },

    async toStep1() {
      await this.verifyEmail();

      if (!!this.errors.email) {
        return;
      }

      this.step++;
    },

    async signUp() {
      this.verfiyFirstName();
      this.verifyLastName();
      this.verifyHeading();

      if (
        !!this.errors.firstName ||
        !!this.errors.lastName ||
        !!this.errors.heading
      ) {
        return;
      }

      const res = await this.$store.dispatch("user/GuestLogin", {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        heading: this.heading,
        receiveNotifications: this.receiveNotifications
      });

      if (res.error) {
        // TODO better notification system
        alert(res.error);
        return;
      }

      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #3e5daa;
}
</style>
