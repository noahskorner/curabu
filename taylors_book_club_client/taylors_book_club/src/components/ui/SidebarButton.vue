<template>
  <button
    id="sidebar-btn-wrapper"
    class="w-full flex justify-center items-center my-4"
  >
    <button
      id="sidebar-btn"
      class="w-full rounded-xl text-xl mx-8 py-3 h-full flex justify-center items-center"
    >
      <slot></slot>
    </button>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
#sidebar-btn-wrapper {
  height: 3rem;
}

#sidebar-btn-wrapper:active {
  padding: 3px;
}
</style>
