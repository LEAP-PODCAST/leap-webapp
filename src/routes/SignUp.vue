<template>
  <div
    class="p-8 bg-gray-900 text-white rounded-lg m-auto"
    style="max-width:600px"
  >
    <div class="md:flex justify-between items-center mb-5">
      <h1 v-if="step === 0" class="text-2xl font-bold">Create Your Account</h1>
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

    <div v-if="step === 0">
      <div class="md:flex mb-3">
        <div class="md:w-6/12 mr-6">
          <d-input
            type="text"
            v-model="firstName"
            label="First name"
            required
          />
        </div>
        <div class="md:w-6/12">
          <d-input type="text" v-model="lastName" label="Last name" required />
        </div>
      </div>
      <d-input
        type="text"
        v-model="email"
        label="Email"
        class="mb-3"
        required
      />
      <d-input
        type="checkbox"
        v-model="recieveNotifications"
        label="Recieve emails about upcoming your upcoming podcasts."
        class="mb-8"
        required
      />
      <div>
        <h2 class="text-xl">Date of birth</h2>
        <p class="opacity-50 font-thin mb-2">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or an alien.
        </p>
        <div class="flex">
          <label class="w-6/12 mr-2">
            <p>Month</p>
            <select v-model="dob.month" class="text-black w-full" required>
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
            <p>Day</p>
            <select v-model="dob.day" class="text-black w-full" required>
              <option v-for="day in days" :key="day" :value="day">
                {{ day }}
              </option>
            </select>
          </label>
          <label class="w-3/12">
            <p>Year</p>
            <select v-model="dob.year" class="text-black w-full" required>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <d-btn @click="toStep1" variant="primary" class="mt-6 w-full">
        Next step
      </d-btn>
    </div>

    <div v-if="step === 1">
      <d-input type="text" v-model="username" label="Username" required />

      <d-btn @click="toStep2" variant="primary" class="mt-6 w-full">
        Continue
      </d-btn>
    </div>

    <div v-if="step === 2">
      <d-input
        type="password"
        v-model="password"
        label="Password"
        class="mb-3"
        required
      />
      <d-input
        type="password"
        v-model="password2"
        label="Repeat password"
        class="mb-6"
        required
      />
      <p class="text-gray-500 text-sm">
        By signing up, you agree to the <a href="">Terms of Service</a> and
        <a href="Privacy Policy"></a>, including <a href="">Cookie Use</a>.
        Others will be able to find you by email or phone number when provided ·
        <a href="">Privacy Options</a>.
      </p>

      <d-btn @click="signUp" variant="primary" class="w-full mt-6">
        Let's go
      </d-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    step: 0,
    firstName: "",
    lastName: "dsadasd",
    email: "",
    recieveNotifications: true,
    dob: {
      month: 0,
      day: 0,
      year: new Date().getFullYear()
    },
    username: "",
    password: "",
    password2: ""
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
    toStep1() {
      this.step++;
    },

    toStep2() {
      this.step++;
    },

    signUp() {}
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #3e5daa;
}
</style>
