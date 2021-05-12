<template>
  <label>
    <div
      class="flex"
      :class="{ 'flex-wrap items-center': type !== 'checkbox' }"
    >
      <input
        v-if="type === 'checkbox'"
        type="checkbox"
        v-bind="$attrs"
        :checked="value"
        @input="$emit('input', !value)"
        class="w-6 h-6 mr-2 flex-shrink-0 text-gray-800 border rounded"
      />
      <span v-if="label" :class="{ 'visually-hidden': screenReaderOnly }">
        {{ label }}
        <span
          v-if="$attrs.required !== undefined"
          title="Required"
          aria-hidden
          class="text-red-500"
          >*</span
        >
      </span>
      <input
        v-if="['text', 'email', 'password'].indexOf(type) > -1"
        :type="type"
        v-bind="$attrs"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur')"
        class="w-full"
        :class="invalid ? 'border-red-500' : `input-${variant}`"
      />
    </div>
  </label>
</template>

<script>
const types = ["text", "email", "password", "checkbox"];

const variants = [
  "none",
  "primary",
  "secondary",
  "white-underline",
  "white-underline-small-placeholder"
];

export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    type: {
      type: String,
      default: "text",
      validator: function(value) {
        return types.indexOf(value) > -1;
      }
    },
    label: String,
    screenReaderOnly: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      required: true,
      validator: function(value) {
        return variants.indexOf(value) > -1;
      }
    },
    invalid: Boolean,
    placeholder: String
  }
};
</script>

<style lang="scss">
@mixin optional-at-root($sel) {
  @at-root #{if(not &, $sel, selector-append(&, $sel))} {
    @content;
  }
}

@mixin focus-placeholder {
  @include optional-at-root(":focus::-webkit-input-placeholder") {
    @content;
  }

  @include optional-at-root(":focus:-moz-placeholder") {
    @content;
  }

  @include optional-at-root(":focus::-moz-placeholder") {
    @content;
  }

  @include optional-at-root(":focus:-ms-input-placeholder") {
    @content;
  }
}

@mixin placeholder {
  @include optional-at-root("::-webkit-input-placeholder") {
    @content;
  }

  @include optional-at-root(":-moz-placeholder") {
    @content;
  }

  @include optional-at-root("::-moz-placeholder") {
    @content;
  }

  @include optional-at-root(":-ms-input-placeholder") {
    @content;
  }
}

input:disabled {
  @apply text-gray-600;
}

.input-primary {
  text-indent: 1rem !important;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-width: 1px;
  border-radius: 10px;
  border-color: darkgray;
  background-color: #1a202c;

  &:focus {
    border-color: #ea455a;
    outline: none;
  }

  @include focus-placeholder {
    font-size: 10px;
    vertical-align: top;
    transform: translateY(-150%) translateX(-1%);
    color: #ea455a;
  }
}

.input-secondary {
  text-indent: 1rem !important;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-width: 1px;
  border-radius: 10px;
  border-color: darkgray;
  background-color: #1a202c;

  &:focus {
    border-color: #ea455a;
    outline: none;
  }

  @include focus-placeholder {
    font-size: 10px;
    vertical-align: top;
    transform: translateY(-150%) translateX(-1%);
    color: #ea455a;
  }
}

.input-white-underline {
  @apply .text-black;
  text-indent: 0.5rem !important;

  &:focus {
    border-color: #ea455a;
    outline: none;
  }

  @include placeholder {
    color: #3a3e46;
  }
}

.input-white-underline-small-placeholder {
  @apply .text-black;
  text-indent: 0.5rem !important;

  @include placeholder {
    color: #94a0b0;
    font-size: 14px;
  }
}
</style>
