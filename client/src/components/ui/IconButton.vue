<template>
  <button id="icon-btn-wrapper" class="flex justify-center items-center mx-2">
    <div
      id="icon-btn"
      class="bg-light-gray w-full h-full flex justify-center items-center"
    >
      <slot></slot>
    </div>
  </button>
</template>

<style scoped>
#icon-btn-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--gray-90);
}

#icon-btn-wrapper:active {
  padding: 1px;
}

#icon-btn-wrapper:active #icon-btn {
  background-color: var(--gray-25);
}

#icon-btn {
  border-radius: 50%;
}

#icon-btn:hover {
  background-color: var(--gray-20);
}

#icon-btn:active {
  background-color: var(--gray-25);
}
</style>
