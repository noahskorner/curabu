<template>
  <div>
    <label for="" class="font-medium text-sm">{{ label }}</label>
    <div
      :class="inputWrapperClass"
      class="w-full flex justify-between items-center px-2 mt-1 rounded border"
    >
      <input
        @input="setValue"
        @blur="$emit('blur')"
        :value="value"
        :type="showPassword ? 'text' : type"
        class="w-full h-10 bg-b-secondary"
      />
      <button
        @click="toggleShowPassword"
        v-if="type === 'password' || showPassword"
        tabindex="-1"
      >
        <svg
          v-if="showPassword"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ai ai-EyeSlashed"
        >
          <path
            d="M6.873 17.129c-1.845-1.31-3.305-3.014-4.13-4.09a1.693 1.693 0 0 1 0-2.077C4.236 9.013 7.818 5 12 5c1.876 0 3.63.807 5.13 1.874"
          />
          <path d="M14.13 9.887a3 3 0 1 0-4.243 4.242" />
          <path d="M4 20L20 4" />
          <path
            d="M10 18.704A7.124 7.124 0 0 0 12 19c4.182 0 7.764-4.013 9.257-5.962a1.694 1.694 0 0 0-.001-2.078A22.939 22.939 0 0 0 19.57 9"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ai ai-EyeOpen"
        >
          <path
            d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
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
import { reactive, toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
      default: "Label",
    },
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
  },
  emits: ["input", "blur"],
  setup(props, { emit }) {
    const setValue = (e) => {
      emit("input", e.target.value);
    };

    const inputWrapperClass = computed(() => {
      const classes = [];
      if (props.errors.length) classes.push("border-red-500");
      else classes.push("border-bd-primary");

      classes.push("bg-b-secondary");

      return classes;
    });

    const state = reactive({
      showPassword: false,
    });

    const toggleShowPassword = () => {
      state.showPassword = !state.showPassword;
    };

    return {
      setValue,
      inputWrapperClass,
      ...toRefs(state),
      toggleShowPassword,
    };
  },
};
</script>

<style></style>
