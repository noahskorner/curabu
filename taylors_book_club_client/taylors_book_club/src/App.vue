<template>
  <div class="min-h-screen font-primary relative">
    <!-- Theme -->
    <teleport to="head">
      <link rel="stylesheet" type="text/css" :href="getTheme" />
    </teleport>
    <Header v-if="$route.name !== 'login'"/>
    <transition name="slide-left" mode="out-in" v-if="$route.name !== 'login'">
      <Sidebar v-show="getShowSidebar" />
    </transition>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Header,
    Sidebar,
  },
  computed: {
    ...mapGetters(["getTheme"]),
    ...mapGetters("sidebar", ["getShowSidebar"]),
  },
  methods: {
    ...mapActions("sidebar", ["hideSidebar"]),
  },
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
}
button:focus {
  outline: 0 !important;
}
</style>
