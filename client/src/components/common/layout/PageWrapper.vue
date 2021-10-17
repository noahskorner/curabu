<template>
  <div class="w-screen h-screen">
    <Sidebar />
    <div class="w-full flex justify-center items-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import useWindowSize from "../../../composables/useWindowSize";
export default {
  components: {
    Sidebar,
  },
  setup() {
    const { width, height } = useWindowSize();

    return {
      width,
      height,
    };
  },
};
</script>
