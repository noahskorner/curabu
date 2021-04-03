<template>
  <div class="min-h-screen font-primary relative">
    <!-- Theme -->
    <teleport to="head">
      <link rel="stylesheet" type="text/css" href="/themes/light-theme.css" />
    </teleport>
    <Header />
    <transition name="slide-left">
      <Sidebar v-show="showSidebar" />
    </transition>
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Header,
    Sidebar,
  },
  computed: {
    ...mapGetters("sidebar", ["showSidebar"]),
  },
  setup() {},
};
</script>

<style>
html,
body {
  overflow-x: hidden;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--gray-90);
}
button:focus {
  outline: 0 !important;
}
</style>
