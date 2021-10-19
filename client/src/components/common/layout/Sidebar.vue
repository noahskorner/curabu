<template>
  <div
    :style="{ maxHeight: `${height}px` }"
    class="h-full w-full border-r sidebar"
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

<style scoped>
.sidebar {
  max-width: 16rem;
}
</style>
