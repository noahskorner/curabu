<template>
  <div :class="wrapperClass">
    <label for="" class="font-medium text-sm">{{ label }}</label>
    <div
      :class="inputWrapperClass"
      class="w-full flex justify-between items-center p-2 rounded border"
    >
      <div
        @input="setValue"
        @blur="$emit('blur')"
        :placeholder="placeholder"
        class="w-full bg-b-secondary min-h-24"
        contenteditable="true"
      >
        {{ value }}
      </div>
    </div>
    <ul>
      <li
        v-for="(error, index) in errors"
        :key="index"
        class="text-sm text-red-500 font-medium"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: {
    wrapperClass: {
      type: Array,
      required: false,
      default: () => [],
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ["input", "blur"],
  setup(props, { emit }) {
    const setValue = (e) => {
      emit("input", e.target.innerText);
    };

    const inputWrapperClass = computed(() => {
      const classes = [];
      if (props.errors.length) classes.push("border-red-500");
      else classes.push("border-bd-primary");

      classes.push("bg-b-secondary");

      return classes;
    });

    return {
      setValue,
      inputWrapperClass,
    };
  },
};
</script>

<style></style>
