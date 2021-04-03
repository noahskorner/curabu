<template>
  <button
    id="icon-btn"
    class="bg-light-gray flex justify-center items-center mx-2"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
#icon-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}
</style>
