<template>
  <div class="min-h-screen font-primary relative">
    <!-- Theme -->
    <teleport to="head">
      <link rel="stylesheet" type="text/css" :href="theme" />
    </teleport>
    <Header v-if="$route.name !== 'login'" />
    <div
      id="sidebar-overlay"
      v-show="showSidebar"
      class="absolute w-screen h-screen top-0 left-0 z-10 bg-black"
      @click="hideSidebar()"
    ></div>
    <transition name="slide-left" mode="out-in" v-if="$route.name !== 'login'">
      <Sidebar v-show="showSidebar" />
    </transition>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: {
    Header,
    Sidebar,
  },
  setup() {
    //if localstorage[user] exists, set the user state to that
    const store = useStore();
    if (localStorage.Authorization && localStorage.user) {
      const user = JSON.parse(localStorage.user);
      store.dispatch("user/setUser", user);
    }

    return {
      theme: computed(() => store.state.theme),
      showSidebar: computed(() => store.state.sidebar.showSidebar),
      hideSidebar: () => store.dispatch("sidebar/hideSidebar"),
    };
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
input:focus {
  outline: 0 !important;
}

#sidebar-overlay {
  opacity: 0.1;
  backdrop-filter: blur(100px);
}
</style>
