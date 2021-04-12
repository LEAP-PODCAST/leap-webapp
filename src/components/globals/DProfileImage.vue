<template>
  <img
    :src="
      imageUrl.length
        ? imageUrl
        : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fwww.repol.copl.ulaval.ca%2Fwp-content%2Fuploads%2F2019%2F01%2Fdefault-user-icon.jpg%3Ffit%3D300%252C300&f=1&nofb=1'
    "
    class="rounded-full"
    alt=""
  />
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: ""
    }
  }
};
</script>

<style></style>
