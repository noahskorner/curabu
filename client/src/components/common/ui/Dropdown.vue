<template>
  <div class="relative">
    <slot name="button" :toggleMenu="toggleMenu"></slot>
    <transition name="fade-in">
      <div class="relative z-50">
        <slot name="menu" :hideMenu="hideMenu" :showMenu="showMenu"></slot>
      </div>
    </transition>
    <div
      v-show="showMenu"
      @click="hideMenu"
      class="fixed top-0 bottom-0 left-0 right-0"
    ></div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const showMenu = ref(false);

    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };

    const hideMenu = () => {
      showMenu.value = false;
    };

    return {
      showMenu,
      toggleMenu,
      hideMenu,
    };
  },
};
</script>

<style></style>
