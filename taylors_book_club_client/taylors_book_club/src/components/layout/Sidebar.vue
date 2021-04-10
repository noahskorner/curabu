<template>
  <div id="sidebar" class="absolute w-full min-h-screen max-w-md inline-block">
    <div id="sidebar-header" class="w-full px-4 flex justify-end items-center">
      <IconButton @click="hideSidebar()">
        <i class="fas fa-times fa-lg"></i>
      </IconButton>
    </div>
    <button @click="toggleTheme()">{{ getTheme }}</button>
    <div class="my-16">
      <SidebarButton>My clubs</SidebarButton>
      <SidebarButton>Newsletter</SidebarButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SidebarButton from "../ui/SidebarButton.vue";
export default {
  components: {
    SidebarButton,
  },
  computed: {
    ...mapGetters(["getTheme"]),
    ...mapGetters("sidebar", ["getShowSidebar"]),
  },
  methods: {
    ...mapActions(["setTheme"]),
    ...mapActions("sidebar", ["hideSidebar", "displaySidebar"]),

    toggleTheme() {
      if (this.getTheme.includes("light")) this.setTheme("dark");
      else this.setTheme("light");
    },
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
