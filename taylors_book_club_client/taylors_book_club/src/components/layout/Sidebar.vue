<template>
  <div id="sidebar-wrapper" class="min-h-screen w-screen absolute flex">
    <transition name="slide-left" mode="out-in">
      <div
        id="sidebar"
        class="w-full min-h-screen max-w-md inline-block"
        v-show="getShowSidebar"
      >
        <div
          id="sidebar-header"
          class="w-full px-4 flex justify-end items-center"
        >
          <IconButton @click="hideSidebar()">
            <i class="fas fa-times fa-lg"></i>
          </IconButton>
        </div>
        <button @click="toggleTheme()">{{ getTheme }}</button>
        <Button />
      </div>
    </transition>
    <div class="w-full min-h-screen" @click="hideSidebar()"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Button from "../ui/Button.vue";
export default {
  components: {
    Button,
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
#sidebar-wrapper {
  top: 0;
  left: 0;
}

#sidebar-header {
  height: 4rem;
}
</style>
