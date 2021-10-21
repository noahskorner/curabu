<template>
  <div class="w-screen h-screen relative bg-gray-50">
    <Sidebar />
    <Header />
    <div class="w-full flex justify-center items-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import useWindowSize from "../../../composables/useWindowSize";
export default {
  components: {
    Sidebar,
    Header,
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
