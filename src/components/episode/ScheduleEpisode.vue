<template>
  <div class="bg-white rounded-xl text-gray-700 p-4">
    <d-input type="text" v-model="name" label="Episode name" />
    <label>
      Podcasts
      <select>
        <option></option>
      </select>
    </label>

    <div class="flex items-center">
      <i class="material-icons">access_time</i>
      <div class="text-left ml-3">
        <div>
          <span class="mr-8">Tue, Feb 16</span>
          <span>9:30am - 10:30am</span>
        </div>
        <div class="text-gray-500 text-xs">Pacific Standard Time</div>
      </div>
    </div>

    <d-input type="text" v-model="guests" label="Add guests" />
    <d-input type="text" v-model="description" label="Description" />

    <label>
      <select v-model="visibility">
        <option value="0">Private</option>
        <option value="1">Public</option>
      </select>
    </label>

    <label>
      <select v-model="timeToAlert">
        <option value="15">15 minutes before</option>
        <option value="30">30 minutes before</option>
        <option value="60">1 hour before</option>
        <option value="120">2 hours before</option>
      </select>
    </label>

    <div class="flex justify-center pt-4">
      <d-btn variant="primary-outline" class="mr-2 px-3">
        Start now
      </d-btn>
      <d-btn variant="primary" class="px-3">
        Next
      </d-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "",
    guests: "",
    description: "",
    visibility: 0,
    timeToAlert: 30
  })
};
</script>

<style></style>
