<template>
  <div class="w-screen h-screen relative bg-b-secondary">
    <transition name="slide-left">
      <Sidebar v-show="showSidebar" />
    </transition>
    <div
      v-show="showSidebar"
      @click="hideSidebar"
      class="bg-black fixed top-0 left-0 right-0 bottom-0 z-20 lg:hidden opacity-20"
    ></div>
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
import useSidebar from "../../../composables/useSidebar";
export default {
  components: {
    Sidebar,
    Header,
  },
  setup() {
    const { width, height } = useWindowSize();
    const { showSidebar, hideSidebar } = useSidebar();

    return {
      width,
      height,
      showSidebar,
      hideSidebar,
    };
  },
};
</script>
