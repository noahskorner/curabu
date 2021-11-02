<template>
  <div
    :style="{ maxHeight: `${height}px` }"
    class="h-full w-full border-r border-bd-primary sidebar p-2 bg-b-primary"
  >
    <div class="w-full flex flex-col justify-center items-center">
      <div class="w-full px-2 mt-12">
        <button
          @click="setTheme('light')"
          class="w-full py-2 bg-b-secondary rounded"
        >
          Light
        </button>
        <button
          @click="setTheme('dark')"
          class="w-full py-2 mt-2 bg-b-secondary rounded"
        >
          Dark
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useWindowSize from "../../../composables/useWindowSize";
import { setTheme } from "../../../composables/useTheme";
export default {
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
.sidebar {
  max-width: 16rem;
}
</style>
