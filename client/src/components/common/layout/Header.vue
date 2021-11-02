<template>
  <div
    class="h-12 border-b border-bd-primary absolute top-0 left-64 header px-2 bg-b-primary"
  >
    <div class="w-full h-full flex justify-end items-center">
      <router-link
        v-if="!isAuthenticated"
        :to="{ name: 'login' }"
        class="btn-primary py-1 px-3 rounded flex justify-center items-center mr-1 text-white font-semibold"
      >
        Login
      </router-link>
      <button
        v-else
        @click="logout"
        class="hover:bg-gray-200 w-8 h-8 rounded flex justify-center items-center mr-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ai ai-Person"
        >
          <circle cx="12" cy="7" r="5" />
          <path
            d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"
          />
        </svg>
      </button>
      <button
        class="hover:bg-gray-200 w-8 h-8 rounded flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ai ai-TextAlignJustified"
        >
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import useAuth from "../../../composables/useAuth";
export default {
  setup() {
    const { isAuthenticated, logout } = useAuth();

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style>
.header {
  width: calc(100% - 16rem);
}
</style>
