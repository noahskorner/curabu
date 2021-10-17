<template>
  <div
    :style="{ maxHeight: `${height}px` }"
    class="h-full w-full max-w-xs border-r"
  ></div>
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

<style></style>
