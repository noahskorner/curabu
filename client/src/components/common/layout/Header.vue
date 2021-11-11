<template>
  <div
    :class="headerClass"
    class="h-12 border-b border-bd-primary fixed top-0 px-2 bg-b-primary z-10"
  >
    <div class="w-full h-full flex justify-between items-center">
      <button
        class="flex justify-center items-center lg:hidden hover:bg-b-secondary-op p-1 rounded"
        @click="displaySidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-menu-2"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="var(--t-primary)"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
      <Search />
      <div class="flex justify-end flex-shrink-0">
        <router-link
          v-if="!isAuthenticated"
          :to="{ name: 'login' }"
          class="btn-primary py-1 px-3 rounded flex justify-center items-center mr-1 text-white font-semibold"
        >
          Login
        </router-link>

        <UserDropdown v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import useAuth from "../../../composables/useAuth";
import useSidebar from "../../../composables/useSidebar";
import UserDropdown from "../ui/UserDropdown.vue";
import Search from "../ui/Search.vue";
export default {
  components: {
    UserDropdown,
    Search,
  },
  setup() {
    const { isAuthenticated, logout } = useAuth();
    const { showSidebar, displaySidebar } = useSidebar();

    const headerClass = computed(() => {
      if (showSidebar.value) {
        return ["lg:left-20", "header"];
      } else {
        return ["left-0", "w-full"];
      }
    });

    return {
      isAuthenticated,
      logout,
      showSidebar,
      headerClass,
      displaySidebar,
    };
  },
};
</script>

<style>
.header {
  width: 100%;
}

@media (min-width: 1024px) {
  .header {
    width: calc(100% - 5rem);
  }
}
</style>
