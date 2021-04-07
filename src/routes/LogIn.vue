<template> 
  <div
    class="p-8 bg-gray-900 text-white rounded-lg m-auto"
    style="max-width:600px"
  >
  <h1 class="text-2xl font-bold mb-4">Log in to Leap</h1>
    <form>
      <div class="mb-3">
        <d-input
            type="text"
            v-model="username"
            @blur="verifyUsername"
            placeholder='Email, Phone or Username'
            required
        />
      </div>
      

      <div class="">
        <d-input
          type="password"
          v-model="password"
          @blur="verifyPassword"
          placeholder="Password"
          required
        />
      </div>    

      <d-btn type="submit" variant="primary" class="w-full mt-6">
        Log In
      </d-btn>

      <d-btn @click="$router.push('/PasswordReset')" type="submit" variant="primary-outline" class="w-full mt-2">
        Reset Password
      </d-btn>
    </form>

  </div>

</template>

<script>
export default {};
</script>

<style></style>
