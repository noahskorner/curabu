<template>
  <div>
    <button
      @click="displaySearchbar"
      class="bg-b-tertiary text-t-tertiary text-sm py-1 border border-bd-primary w-64 rounded cursor-text flex justify-between items-center px-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="ai ai-Search"
      >
        <path
          d="M21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0z"
        />
      </svg>
      <p>Search for anything</p>
      <div class="w-6"></div>
    </button>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
export default {
  setup() {
    const state = reactive({
      showSearchbar: false,
    });

    const displaySearchbar = () => {
      state.showSearchbar = true;
    };

    const hideSearchbar = () => {
      state.showSearchbar = false;
    };

    return {
      ...toRefs(state),
      displaySearchbar,
      hideSearchbar,
    };
  },
};
</script>

<style>
.searchbar {
  width: 720px;
}
</style>
