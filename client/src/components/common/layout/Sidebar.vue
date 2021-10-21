<template>
  <div
    :style="{ maxHeight: `${height}px` }"
    class="h-full w-full border-r sidebar p-2 bg-white"
  >
    <div class="w-full flex flex-col justify-center items-center">
      <div class="w-full px-2 mt-12">
        <button class="w-full py-2 bg-gray-100 rounded">Home</button>
      </div>
    </div>
  </div>
</template>

<script>
import useWindowSize from "../../../composables/useWindowSize";
export default {
  setup() {
    const { height } = useWindowSize();

    return {
      height,
    };
  },
};
</script>

<style scoped>
.sidebar {
  max-width: 16rem;
}
</style>
