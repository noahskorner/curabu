<template>
  <div class="w-full h-12 shadow fixed top-0 left-0 px-2 bg-b-primary z-10">
    <div class="w-full h-full flex justify-between items-center">
      <Logo
        :size="['h-10', 'w-10']"
        :outerRingSize="['text-4xl']"
        :innerRingSize="['text-3xl']"
      />
      <button
        class="flex justify-center items-center lg:hidden hover:bg-b-secondary-op p-1 rounded hidden"
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
import useAuth from "../../../composables/useAuth";
import useSidebar from "../../../composables/useSidebar";
import UserDropdown from "../ui/UserDropdown.vue";
import Search from "../ui/Search.vue";
import Logo from "../ui/Logo.vue";
export default {
  components: {
    UserDropdown,
    Search,
    Logo,
  },
  setup() {
    const { isAuthenticated, logout } = useAuth();
    const { showSidebar, displaySidebar } = useSidebar();

    return {
      isAuthenticated,
      logout,
      showSidebar,
      displaySidebar,
    };
  },
};
</script>
