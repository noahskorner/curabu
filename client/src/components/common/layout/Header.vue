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
          <template #menu="{ showMenu, hideMenu }">
            <div
              v-if="showMenu"
              class="absolute w-48 h-64 bg-b-primary border border-bd-primary shadow-lg right-0 top-full mt-1 flex flex-col justify-end"
            >
              <Modal>
                <template #button="{ displayModal }">
                  <button
                    @click="displayModal()"
                    class="w-full px-3 py-2 text-left hover:bg-b-secondary flex items-center"
                  >
                    <p class="text-sm">Themes</p>
                  </button></template
                >
                <template #content="{ hideModal }">
                  <div
                    class="bg-b-primary w-full max-w-lg relative z-10 mt-24 rounded shadow text-t-primary"
                  >
                    <div
                      class="h-10 bg-b-secondary rounded-t px-2 flex items-center justify-between"
                    >
                      <h3 class="uppercase text-xs tracking-wide font-medium">
                        Theme settings
                      </h3>
                      <button
                        @click="
                          hideModal();
                          hideMenu();
                        "
                        class="w-6 h-6 rounded hover:bg-b-opacity flex justify-center items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="ai ai-Cross"
                        >
                          <path d="M20 20L4 4m16 0L4 20" />
                        </svg>
                      </button>
                    </div>
                    <div class="grid grid-cols-6 gap-4 p-4">
                      <button
                        v-for="theme in themes"
                        :key="theme"
                        @click="setTheme(theme)"
                        class="col-span-1 h-12 flex justify-between items-center rounded bg-blue-300"
                      >
                        <div
                          class="w-full h-full rounded-l"
                          :class="`bg-${theme}-500`"
                        ></div>
                        <div
                          class="w-full h-full rounded-r"
                          :class="`bg-${theme}-700`"
                        ></div>
                      </button>
                    </div>
                  </div>
                </template>
              </Modal>

              <button
                class="w-full px-3 py-2 text-left hover:bg-b-secondary flex justify-between items-center"
                @click="setDarkMode(!darkMode)"
              >
                <div class="flex items-center">
                  <p class="text-sm">Dark Mode</p>
                </div>
                <div
                  class="w-9 h-5 border-bd-primary border rounded-full flex items-center"
                  :class="
                    !darkMode
                      ? ['justify-start', 'bg-gray-200']
                      : ['justify-end', 'bg-green-500']
                  "
                >
                  <div
                    class="w-4 h-4 rounded-full bg-white"
                    :class="!darkMode ? ['bg-white'] : ['bg-t-primary']"
                  ></div>
                </div>
              </button>
              <div class="w-full px-3">
                <hr class="border-bd-primary px-3" />
              </div>
              <button
                class="w-full px-3 py-2 text-left hover:bg-b-secondary flex items-center"
                @click="logout"
              >
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
import useTheme from "../../../composables/useTheme";
import useSidebar from "../../../composables/useSidebar";
import Dropdown from "../ui/Dropdown.vue";
import Modal from "../ui/Modal.vue";
export default {
  components: {
    Dropdown,
    Modal,
  },
  setup() {
    const { isAuthenticated, username, logout } = useAuth();
    const { showSidebar, displaySidebar } = useSidebar();
    const {
      themes,
      darkMode,
      theme: currentTheme,
      setDarkMode,
      setTheme,
    } = useTheme();

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
      themes,
      darkMode,
      currentTheme,
      setDarkMode,
      setTheme,
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
