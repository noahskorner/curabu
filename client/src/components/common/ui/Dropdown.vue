<template>
  <div class="relative">
    <slot name="button" :toggleMenu="toggleMenu"></slot>
    <transition name="fade-in">
      <slot name="menu" :hideMenu="hideMenu" :showMenu="showMenu"></slot>
    </transition>
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
