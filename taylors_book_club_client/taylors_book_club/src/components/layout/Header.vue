<template>
  <div id="header" class="w-screen flex justify-between items-center px-4">
    <div id="left" class="flex justify-start items-center">
      <Logo class="hidden md:block" />
      <IconButton @click="displaySidebar()">
        <i class="fas fa-bars fa-lg"></i>
      </IconButton>
    </div>
    <div id="middle" class="flex justify-center items-center w-full">
      <h2 class="font-secondary text-4xl hidden md:block">
        Taylor's Book Club
      </h2>
      <Logo class="inline-block md:hidden" />
    </div>
    <div id="right" class="flex justify-end items-center">
      <IconButton>
        <i class="fas fa-user-alt fa-lg"></i>
      </IconButton>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("sidebar", ["displaySidebar"]),
  },
};
</script>

<style scoped>
#header {
  height: 4rem;
}
#left {
  width: 33%;
}
#middle {
  width: 33%;
}
#right {
  width: 33%;
}
</style>
