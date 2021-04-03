<template>
  <div id="sidebar" class="min-h-screen absolute w-full max-w-md inline-block">
    <div id="sidebar-header" class="w-full px-4 flex justify-end items-center">
      <IconButton @click="hideSidebar()">
        <i class="fas fa-times fa-lg"></i>
      </IconButton>
    </div>
    <button>Dark mode</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("sidebar", ["hideSidebar", "showSidebar"]),
  },
};
</script>

<style scoped>
#sidebar {
  background-color: blue;
  top: 0;
  left: 0;
}

#sidebar-header {
  height: 4rem;
}
</style>
