<template>
  <div
    :style="{ maxHeight: `${height}px` }"
    class="h-full w-72 fixed top-0 bg-b-primary border-r border-bd-primary flex z-30 lg:z-0"
  >
    <div
      class="w-20 h-full border-r border-bd-primary flex flex-col justify-start items-center"
    >
      <button class="my-2">
        <Logo
          :outerRingSize="['text-6xl']"
          :innerRingSize="['text-5xl']"
          :size="['w-14', 'h-14']"
        />
      </button>
      <hr class="border-t border-bd-primary w-12" />
      <button
        class="w-12 h-12 rounded-full bg-b-tertiary my-2 flex justify-center items-center hover:bg-primary hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="text-primary"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ai ai-Plus"
        >
          <path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
        </svg>
      </button>
    </div>
    <!-- Navigation -->
    <div class="navbar flex flex-col justify-start items-center">
      <div class="w-full p-1">
        <div class="mb-1">
          <button
            @click="setTheme('light')"
            class="w-full p-2 rounded text-left font-semibold flex items-center text-t-tertiary hover:bg-b-secondary-op"
          >
            <div
              class="w-8 h-8 bg-yellow-300 mr-2 rounded-full flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ai ai-Sun text-black"
              >
                <path
                  d="M12 3V2m0 20v-1m9-9h1M2 12h1m15.5-6.5L20 4M4 20l1.5-1.5M4 4l1.5 1.5m13 13L20 20"
                />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <p>Light</p>
          </button>
        </div>
        <div class="mb-1">
          <button
            @click="setTheme('dark')"
            class="w-full p-2 rounded text-left font-semibold flex items-center text-t-tertiary hover:bg-b-secondary-op"
          >
            <div
              class="w-8 h-8 bg-indigo-800 mr-2 rounded-full flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke-width="2"
                class="ai ai-MoonFill text-white"
              >
                <path
                  d="M20.958 15.325c.204-.486-.379-.9-.868-.684a7.684 7.684 0 0 1-3.101.648c-4.185 0-7.577-3.324-7.577-7.425a7.28 7.28 0 0 1 1.134-3.91c.284-.448-.057-1.068-.577-.936C5.96 4.041 3 7.613 3 11.862 3 16.909 7.175 21 12.326 21c3.9 0 7.24-2.345 8.632-5.675z"
                />
                <path
                  d="M15.611 3.103c-.53-.354-1.162.278-.809.808l.63.945a2.332 2.332 0 0 1 0 2.588l-.63.945c-.353.53.28 1.162.81.808l.944-.63a2.332 2.332 0 0 1 2.588 0l.945.63c.53.354 1.162-.278.808-.808l-.63-.945a2.332 2.332 0 0 1 0-2.588l.63-.945c.354-.53-.278-1.162-.809-.808l-.944.63a2.332 2.332 0 0 1-2.588 0l-.945-.63z"
                />
              </svg>
            </div>
            <p>Dark</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useWindowSize from "../../../composables/useWindowSize";
import { setTheme } from "../../../composables/useTheme";
import Logo from "../ui/Logo.vue";
export default {
  components: {
    Logo,
  },
  setup() {
    const { height } = useWindowSize();

    return {
      height,
      setTheme,
    };
  },
};
</script>

<style scoped>
.navbar {
  width: calc(100% - 5rem);
}
</style>
