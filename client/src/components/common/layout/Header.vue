<template>
  <div
    :class="headerClass"
    class="h-12 border-b border-bd-primary fixed top-0 px-2 bg-b-primary z-10"
  >
    <div class="w-full h-full flex justify-between lg:justify-end items-center">
      <div>
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
      </div>
      <div>
        <router-link
          v-if="!isAuthenticated"
          :to="{ name: 'login' }"
          class="btn-primary py-1 px-3 rounded flex justify-center items-center mr-1 text-white font-semibold"
        >
          Login
        </router-link>

        <Dropdown v-else>
          <template #button="{ toggleMenu }">
            <button
              @click="toggleMenu"
              class="flex justify-center items-center border border-bd-primary p-2 rounded hover:bg-b-secondary-op"
            >
              <p class="text-xs mr-1">{{ username }}</p>
            </button></template
          >
          <template #menu="{ showMenu, toggleMenu }">
            <div
              v-if="showMenu"
              v-click-away="toggleMenu"
              class="absolute w-48 h-64 bg-b-primary border border-bd-primary shadow-sm right-0 top-full mt-1 flex flex-col justify-end"
            >
              <div class="w-full px-4">
                <hr class="border-bd-primary px-4" />
              </div>
              <button
                class="w-full px-4 py-2 text-left hover:bg-b-secondary flex items-center"
                @click="logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ai ai-SignOut mr-3"
                >
                  <path d="M13 12h9m0 0l-3.333-4M22 12l-3.333 4" />
                  <path
                    d="M14 7V5.174a2 2 0 0 0-2.166-1.993l-8 .666A2 2 0 0 0 2 5.84v12.32a2 2 0 0 0 1.834 1.993l8 .667A2 2 0 0 0 14 18.826V17"
                  />
                </svg>
                <p class="text-sm">Logout</p>
              </button>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import useAuth from "../../../composables/useAuth";
import useSidebar from "../../../composables/useSidebar";
import Dropdown from "../ui/Dropdown.vue";
export default {
  components: {
    Dropdown,
  },
  setup() {
    const { isAuthenticated, username, logout } = useAuth();
    const { showSidebar, displaySidebar } = useSidebar();

    const headerClass = computed(() => {
      if (showSidebar.value) {
        return ["lg:left-72", "header"];
      } else {
        return ["left-0", "w-full"];
      }
    });

    return {
      isAuthenticated,
      username,
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
    width: calc(100% - 18rem);
  }
}
</style>
