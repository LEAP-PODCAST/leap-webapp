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
        class="w-6 h-6 mr-2 flex-shrink-0 bg-gray-200 text-gray-800 border rounded"
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
        class="py-2 px-3 w-full"
        :class="invalid ? 'border-red-500' : ''"
      />
    </div>
  </label>
</template>

<script>
const types = ["text", "email", "password", "checkbox"];

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
    invalid: Boolean,
    placeholder: String
  }
};
</script>

<style lang="scss">
input:disabled {
  @apply text-gray-600;
}
</style>
