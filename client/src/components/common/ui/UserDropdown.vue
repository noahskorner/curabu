<template>
  <Dropdown>
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
        class="absolute w-48 bg-b-primary border border-bd-primary shadow-lg right-0 top-0 mt-1 flex flex-col justify-end font-primary rounded p-2"
      >
        <button
          class="w-full px-3 py-2 text-left hover:bg-b-secondary flex items-center rounded"
        >
          <p class="text-sm">Profile</p>
        </button>
        <button
          class="w-full px-3 py-2 text-left hover:bg-b-secondary flex items-center rounded"
        >
          <p class="text-sm">Settings</p>
        </button>
        <Modal @hideModal="hideMenu">
          <template #button="{ displayModal }">
            <button
              @click="displayModal()"
              class="w-full px-3 py-2 text-left hover:bg-b-secondary flex items-center rounded"
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
                <h3
                  class="uppercase text-xs tracking-wide font-medium font-secondary"
                >
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
              <div class="p-4">
                <h6
                  class="text-sm font-light text-t-secondary w-full border-b border-bd-primary pb-1 mb-4 font-primary"
                >
                  Choose a theme
                </h6>
                <div class="grid grid-cols-4 gap-4">
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
            </div>
          </template>
        </Modal>

        <button
          class="w-full px-3 py-2 text-left hover:bg-b-secondary flex justify-between items-center rounded"
          @click="setDarkMode(!darkMode)"
        >
          <div class="flex items-center">
            <p class="text-sm">Dark Mode</p>
          </div>
          <div
            class="w-8 h-5 border-bd-primary border rounded-full flex items-center"
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
        <div class="w-full px-3 my-1">
          <hr class="border-bd-primary px-3" />
        </div>
        <button
          class="w-full px-3 py-2 text-left hover:bg-b-secondary flex items-center rounded"
          @click="logout"
        >
          <p class="text-sm">Logout</p>
        </button>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import Dropdown from "./Dropdown.vue";
import Modal from "./Modal.vue";
import useTheme from "../../../composables/useTheme";
import useAuth from "../../../composables/useAuth";
export default {
  components: {
    Dropdown,
    Modal,
  },
  setup() {
    const {
      themes,
      darkMode,
      theme: currentTheme,
      setDarkMode,
      setTheme,
    } = useTheme();
    const { username, logout } = useAuth();

    return {
      themes,
      darkMode,
      currentTheme,
      setDarkMode,
      setTheme,
      username,
      logout,
    };
  },
};
</script>

<style></style>
