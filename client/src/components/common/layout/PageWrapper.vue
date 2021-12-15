<template>
  <div
    class="w-screen relative bg-b-primary"
    :style="{ height: `${height}px` }"
  >
    <transition name="slide-left">
      <Sidebar v-show="showSidebar" />
    </transition>
    <div
      v-show="showSidebar"
      @click="hideSidebar"
      class="bg-black fixed top-0 left-0 right-0 bottom-0 z-20 lg:hidden opacity-60"
    ></div>
    <Header />
    <div
      class="w-full h-full flex justify-center items-center pt-12"
      :class="showSidebar && ['lg:pl-72', 'pr-page-wrapper']"
    >
      <div class="w-full h-full p-2 overflow-y-auto">
        <slot name="default"></slot>
      </div>
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

<style scoped>
.pr-page-wrapper {
  padding-right: 0;
}

@media (min-width: 2040px) {
  .pr-page-wrapper {
    padding-right: 18rem;
  }
}
</style>
