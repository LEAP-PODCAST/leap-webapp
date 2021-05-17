<template>
  <img
    class="rounded-full image-border"
    alt="Podcast Image"
    :src="imageUrl.length ? imageUrl : placeHolder"
  />
</template>

<script>
export default {
  data: () => ({
    placeHolder:
      "https://s3-alpha-sig.figma.com/img/fcac/0d84/6217b29f9de77416577177f67b7bd5a0?Expires=1622419200&Signature=Z6Yevi-rmq8GXGMlIO-pos132cQYyyy0itmYlxzXKoiRXM9CVnN8MHb3FXqe7cVnifbRG8mBdj6DzSJJvo-V9N36EEEp8ybQ5E7zYRq4~ibxS6hxBhcDKNO5cYN6ZaU5Ozbm2Bl~Wn208QsqGVMQr~g~W6q-FrvFWjB3eTttGnf8z6H2un2PBrmXJbAXb3BWES7Q2XGbEGIAmMhN16GQr~tRAo5LOr~PyaM~Me6ut6IV7QtEAf0K7igLQh3dR4hcePJ8C8jDX61krp7qdbb78mtJQKps0ATjh84jgvjzNp13vHKaHQxis30VZpXTMO0TjeXdu6OhBhGSBL-zA8GgBA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
  }),
  props: {
    imageUrl: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
.image-border {
  @apply rounded-full;

  border: double 5px transparent;
  border-radius: 9999px;
  background-image: linear-gradient(white, white),
    linear-gradient(to bottom, #dabd26, #b82335);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
