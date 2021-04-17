<template>
  <div
    id="sidebar"
    class="absolute w-full min-h-screen max-w-md inline-block z-20"
  >
    <div id="sidebar-header" class="w-full px-4 flex justify-end items-center">
      <IconButton @click="hideSidebar()">
        <i class="fas fa-times fa-lg"></i>
      </IconButton>
    </div>
    <button @click="toggleTheme()">{{ theme }}</button>
    <div class="my-16">
      <router-link to="clubs">
        <SidebarButton>My clubs</SidebarButton>
      </router-link>
      <SidebarButton>Newsletter</SidebarButton>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import SidebarButton from "../ui/SidebarButton.vue";
export default {
  components: {
    SidebarButton,
  },
  setup() {
    const store = useStore();
    return {
      theme: computed(() => store.state.theme),
      toggleTheme: () => store.dispatch("toggleTheme"),
      hideSidebar: () => store.dispatch("sidebar/hideSidebar"),
      displaySidebar: () => store.dispatch("sidebar/displaySidebar"),
    };
  },
};
</script>

<style scoped>
#sidebar {
  top: 0;
  left: 0;
}

#sidebar-header {
  height: 4rem;
}
</style>
