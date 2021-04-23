<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="p-btn flex justify-center inline-block font-bold px-5"
    :class="`btn-${variant} ${computedSize} ${norounded ? '' : 'rounded-full'}`"
  >
    <slot></slot>
  </button>
</template>

<script>
const variants = [
  "none",
  "primary",
  "primary-outline",
  "primary-hover",
  "white",
  "white-outline",
  "dark",
  "primary-dashed",
  "simple"
];
const sizes = ["xs", "sm", "md", "lg"];

export default {
  props: {
    variant: {
      type: String,
      required: true,
      validator: function(value) {
        return variants.indexOf(value) > -1;
      }
    },

    size: {
      type: String,
      default: "md",
      validator: function(value) {
        return sizes.indexOf(value) > -1;
      }
    },

    norounded: Boolean
  },

  computed: {
    computedSize() {
      switch (this.size) {
        case "xs":
          return "px-1";
        case "sm":
          return "py-1 px-2";
        case "md":
          return "py-2 px-3";
        case "lg":
          return "py-3 px-4";
      }
    }
  }
};
</script>

<style lang="scss">
.p-link,
.p-btn {
  transition-duration: 100ms;
  color: #e2e8f0;

  &:hover {
    transform: translateY(-1px);
    outline: none;
  }

  &:focus {
    outline: none;
  }
}

.btn-simple {
  color: lightgray;
  background: transparent;
  font-weight: 200;
  outline: none;

  &:hover {
    outline: none;
  }
}

.btn-primary {
  background: #ea455a;
}

.btn-primary-outline {
  color: #ea455a;
  background: transparent;
  border: 1px solid #ea455a;

  &:hover {
    background: #ea455a;
    color: white;
  }
}

.btn-white {
  background: #e2e8f0;
  color: #009dee;
}

.btn-white-outline {
  color: #e2e8f0;
  background: #009dee;

  &:hover {
    background: #e2e8f0;
    color: #009dee;
  }
}

.btn-primary-hover {
  color: #ea455a;
  background: transparent;

  &:hover {
    background: #ea455a;
    color: #e2e8f0;
  }
}

.btn-primary-dashed {
  @apply .border-dashed;
  @apply .border-primary;
  @apply .text-primary;
  @apply .py-2;
  @apply .px-4;
  @apply .font-bold;
  @apply .border-2;
  @apply .bg-dark-1;

  &:hover {
    color: #e2e8f0;
    background: #009dee;
  }
}
</style>
