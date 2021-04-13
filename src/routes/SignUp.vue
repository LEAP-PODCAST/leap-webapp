<template>
  <div
    class="p-8 bg-gray-900 text-white rounded-lg w-full"
    style="max-width:600px"
  >
    <div class="md:flex justify-between items-center mb-5">
      <h1 v-if="stepb === 0" class="text-2xl font-bold">Create Your Account</h1>
      <h1 v-else-if="step === 1" class="text-2xl font-bold">
        Choose Your Username
      </h1>
      <h1 v-else-if="step === 2" class="text-2xl font-bold">
        Pick a good password
      </h1>
      <div class="md:flex flex-col">
        <p class="text-sm font-thin mr-2 opacity-50">
          Step {{ step + 1 }} of 3
        </p>
        <button v-if="step > 0" @click="step--" class="text-xs opacity-25">
          &lt; go back
        </button>
      </div>
    </div>

    <form @submit.prevent="toStep1" v-if="step === 0">
      <div class="md:flex mb-3">
        <div class="md:w-6/12 mr-2">
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
        <div class="md:w-6/12">
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
      </div>
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

      <div class="mt-3 mb-4">
        <d-input
          type="checkbox"
          v-model="receiveNotifications"
          label="Recieve emails about upcoming your upcoming podcasts."
          required
        />
      </div>

      <div>
        <h2 class="text-xl">Date of birth</h2>
        <p class="opacity-50 font-thin mb-2">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or an alien.
        </p>
        <div class="flex">
          <label class="w-6/12 mr-2">
            <select
              v-model="dob.month"
              class="w-full bg-gray-900 rounded-select"
              required
            >
              <option
                value=""
                disabled
                selected
                hidden
                class="select-placeholder"
                >Month</option
              >
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </label>
          <label class="w-3/12 mr-2">
            <select
              v-model="dob.day"
              class="w-full bg-gray-900 rounded-select"
              required
            >
              <option v-for="day in days" :key="day" :value="day">
                {{ day }}
              </option>
            </select>
          </label>
          <label class="w-3/12">
            <select
              v-model="dob.year"
              class="w-full bg-gray-900 rounded-select"
              required
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <d-btn type="submit" variant="primary" class="mt-6 w-full">
        Next step
      </d-btn>
    </form>

    <form @submit.prevent="toStep2" v-if="step === 1">
      <d-input
        type="text"
        v-model="username"
        @blur="verifyUsername"
        placeholder="Username"
        required
      />
      <small v-if="errors.username" class="text-red-500">
        {{ errors.username }}
      </small>

      <d-btn type="submit" variant="primary" class="mt-6 w-full">
        Continue
      </d-btn>
    </form>

    <form @submit.prevent="signUp" v-if="step === 2">
      <div class="mb-3">
        <d-input
          type="password"
          v-model="password"
          @blur="verifyPassword"
          placeholder="Password"
          required
        />
        <small v-if="errors.password" class="text-red-500">
          {{ errors.password }}
        </small>
      </div>
      <div class="mb-8">
        <d-input
          type="password"
          v-model="password2"
          @blur="verifyPassword2"
          placeholder="Re-enter Password"
          required
        />
        <small v-if="errors.password2" class="text-red-500">
          {{ errors.password2 }}
        </small>
        <small v-if="errors.passwordsMatch" class="text-red-500">
          {{ errors.passwordsMatch }}
        </small>
      </div>
      <p class="text-gray-500 text-sm">
        By signing up, you agree to the <a href="">Terms of Service</a> and
        <a href="Privacy Policy"></a>, including <a href="">Cookie Use</a>.
        Others will be able to find you by email or phone number when provided ·
        <a href="">Privacy Options</a>.
      </p>

      <d-btn type="submit" variant="primary" class="w-full mt-6">
        Let's go
      </d-btn>
    </form>
  </div>
</template>

<script>
const regex = {
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  username: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/,
  name: /^[A-Za-z]+$/,
  nameWithSpaces: /^([A-Za-z ])+$/
};

export default {
  data: () => ({
    step: 0,
    firstName: "",
    lastName: "",
    email: "",
    receiveNotifications: true,
    dob: {
      month: 0,
      day: 0,
      year: new Date().getFullYear()
    },
    username: "",
    password: "",
    password2: "",

    errors: {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      username: "",
      password: "",
      password2: "",
      passwordsMatch: ""
    }
  }),

  computed: {
    days() {
      return new Array(31).fill().map((v, i) => i);
    },

    years() {
      const year = new Date().getFullYear();
      return new Array(year - 1900 + 1)
        .fill()
        .map((v, i) => 1900 + i)
        .reverse();
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

    verifyDOB() {
      // TODO do age check
      return true;
    },

    async verifyUsername() {
      if (!this.username.length) {
        return (this.errors.username = "Username is required.");
      }
      if (!regex.username.test(this.username)) {
        return (this.errors.username =
          "Usernames can only contain a-z, A-Z, 0-9, _, - characters. Cannot start or begin with _ or -.");
      }
      if (this.username.length > 20) {
        return (this.errors.username =
          "Usernames must be 20 characters or less.");
      }
      // TODO check if username is available
      this.errors.username = "";
    },

    verifyPassword() {
      if (!this.password.length) {
        return (this.errors.password = "Password is required.");
      }
      if (this.password.length > 64) {
        return (this.errors.password =
          "Password must be 64 characters or less.");
      }
      this.errors.password = "";
    },

    verifyPassword2() {
      if (!this.password2.length) {
        return (this.errors.password2 = "Password is required.");
      }
      if (this.password2.length > 64) {
        return (this.errors.password2 =
          "Password must be 64 characters or less.");
      }
      this.errors.password2 = "";
    },

    verifyPasswordsMatch() {
      if (this.password !== this.password2) {
        return (this.errors.passwordsMatch = "Passwords do not match.");
      }
      this.errors.passwordsMatch = "";
    },

    async toStep1() {
      this.verfiyFirstName();
      this.verifyLastName();
      await this.verifyEmail();
      this.verifyDOB();

      if (
        !!this.errors.firstName ||
        !!this.errors.lastName ||
        !!this.errors.email ||
        !!this.errors.dob
      ) {
        return;
      }

      this.step++;
    },

    async toStep2() {
      await this.verifyUsername();

      if (!!this.errors.username) {
        return;
      }

      this.step++;
    },

    async signUp() {
      this.verifyPassword();
      this.verifyPassword2();
      this.verifyPasswordsMatch();

      if (
        !!this.errors.password ||
        !!this.errors.password2 ||
        !!this.errors.passwordsMatch
      ) {
        return;
      }

      const res = await this.$store.dispatch("user/signUp", {
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
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
