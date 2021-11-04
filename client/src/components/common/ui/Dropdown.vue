<template>
  <div class="relative">
    <slot name="button" :toggleMenu="toggleMenu"></slot>
    <slot name="menu" :toggleMenu="toggleMenu" :showMenu="showMenu"></slot>
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

    return {
      showMenu,
      toggleMenu,
    };
  },
};
</script>

<style></style>
