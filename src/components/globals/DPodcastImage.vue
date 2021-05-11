<template>
  <img
    :src="
      imageUrl.length
        ? imageUrl
        : 'https://s3-alpha-sig.figma.com/img/fcac/0d84/6217b29f9de77416577177f67b7bd5a0?Expires=1621209600&Signature=UQOFfnDXG2lZazxJSv7VXiSb64ChCRZVhpbygTs5uSU5sVzFyHsUkNsAhI914YzOxEfNBp8Rd39Abg22K9mfuEs7itNkfpCxQKclNRb2~OLqptamelcM3h4wLaHlzWdh0UEiyCfLvNifqZxNk9JV5GCr3TMEEYFq0YR1Wk-DBENrmu3vZdGktKVRPzUlx-vRUoUDaEsKd1goBIuw5PeSVpXFF1ckIS7fgNUnBHO2Wjj2frcgOHkUelxX64d3z4IaluqqBL4ckHtsZgCiwXzjrnwbjqhWC1pSVxeTdgfgK7w-kPaf4lLgtNx9mEaE-qN--1PHIigkI~eeVR3~WMOOJg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
    "
    alt=""
    class="image-border"
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
