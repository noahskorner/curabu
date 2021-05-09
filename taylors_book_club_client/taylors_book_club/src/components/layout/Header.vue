<template>
  <div
    id="header"
    class="w-screen flex justify-between items-center px-4 fixed"
  >
    <div id="left" class="flex justify-start items-center">
      <Logo class="hidden md:block" />
      <IconButton @click="displaySidebar()">
        <i class="fas fa-bars fa-lg"></i>
      </IconButton>
    </div>
    <div id="middle" class="flex justify-center items-center w-full">
      <h2 class="font-primary font-medium text-2xl hidden md:block">clubay</h2>
      <Logo class="inline-block md:hidden" />
    </div>
    <div id="right" class="flex justify-end items-center">
      <AccountModal v-if="isAuthenticated" />
      <router-link v-else to="login">
        <IconButton>
          <i class="fas fa-sign-in-alt fa-lg"></i>
        </IconButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import AccountModal from "../ui/AccountModal.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: {
    AccountModal,
  },
  setup() {
    const store = useStore();

    return {
      displaySidebar: () => store.dispatch("sidebar/displaySidebar"),
      hideSidebar: () => store.dispatch("sidebar/hideSidebar"),
      isAuthenticated: computed(() => store.state.user.isAuthenticated),
    };
  },
};
</script>

<style scoped>
#header {
  height: 3.5rem;
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

#account-modal {
  top: 3rem;
}
</style>
