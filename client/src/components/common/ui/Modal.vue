<template>
  <div>
    <slot name="button" :displayModal="displayModal"></slot>
    <teleport to="body">
      <transition name="fade-in">
        <div
          v-show="showModal"
          class="fixed z-30 top-0 left-0 right-0 bottom-0 flex justify-center items-start p-2"
        >
          <slot name="content" :hideModal="hideModal" class="max-h-screen">
            <div class="w-64 h-64 bg-white relative z-10"></div>
          </slot>
          <div
            @click="
              $emit('hideModal');
              hideModal();
            "
            class="bg-black opacity-60 absolute top-0 left-0 right-0 bottom-0"
          ></div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const showModal = ref(false);

    const displayModal = () => {
      showModal.value = true;
    };

    const hideModal = () => {
      showModal.value = false;
    };

    return {
      showModal,
      displayModal,
      hideModal,
    };
  },
};
</script>

<style></style>
