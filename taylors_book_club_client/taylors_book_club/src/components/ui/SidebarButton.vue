<template>
  <button
    id="sidebar-btn-wrapper"
    class="w-full flex justify-center items-center my-2"
  >
    <button
      id="sidebar-btn"
      class="w-full rounded-xl mx-4 py-3 px-8 h-full flex justify-start items-center hover:text-gray-800"
    >
      <div
        class="mr-6 w-10 h-10 bg-gray-200 rounded-full text-gray-600 flex justify-center items-center"
      >
        <i class="fas fa-lg" :class="icon"></i>
      </div>
      <slot></slot>
    </button>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
      default: "fa-book",
    },
  },
};
</script>

<style scoped>
#sidebar-btn-wrapper {
  height: 3.5rem;
}

#sidebar-btn-wrapper:active {
  padding: 3px;
}

#sidebar-btn-wrapper:hover #sidebar-btn {
  background-color: theme("colors.gray.200");
}
</style>
