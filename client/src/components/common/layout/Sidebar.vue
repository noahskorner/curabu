<template>
  <div
    :style="{ maxHeight: `${height}px` }"
    class="h-full w-72 fixed top-0 bg-b-primary flex z-30 lg:z-0"
  >
    <div
      class="w-20 h-full border-bd-primary flex flex-col justify-start items-center bg-b-secondary"
    >
      <button class="my-2">
        <Logo
          :outerRingSize="['text-6xl']"
          :innerRingSize="['text-5xl']"
          :size="['w-14', 'h-14']"
        />
      </button>
      <router-link
        :to="{ name: 'clubs' }"
        class="w-12 h-12 rounded-full bg-b-tertiary my-2 flex justify-center items-center hover:bg-primary hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="text-primary"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ai ai-Plus"
        >
          <path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
        </svg>
      </router-link>
    </div>
    <!-- Navigation -->
    <div class="navbar flex flex-col justify-start items-center lg:pt-12">
      <div class="w-full p-1">
        <div class="mb-1">
          <router-link
            :to="{ name: 'home' }"
            :class="
              $route.name === 'home'
                ? ['bg-b-secondary', 'text-t-primary']
                : [
                    'hover:text-t-primary',
                    'hover:bg-b-secondary-op',
                    'text-t-tertiary',
                  ]
            "
            class="w-full p-2 rounded text-left font-medium flex items-center"
          >
            <div class="w-8 h-8 flex justify-center items-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ai ai-Home"
              >
                <path
                  d="M22 20v-7.826a4 4 0 0 0-1.253-2.908l-7.373-6.968a2 2 0 0 0-2.748 0L3.253 9.266A4 4 0 0 0 2 12.174V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"
                />
              </svg>
            </div>
            <p>Home</p>
          </router-link>
        </div>
        <div class="mb-1">
          <router-link
            :to="{ name: 'clubs' }"
            :class="
              $route.name === 'clubs'
                ? ['bg-b-secondary', 'text-t-primary']
                : [
                    'hover:text-t-primary',
                    'hover:bg-b-secondary-op',
                    'text-t-tertiary',
                  ]
            "
            class="w-full p-2 rounded text-left font-medium flex items-center"
          >
            <div class="w-8 h-8 flex justify-center items-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ai ai-PeopleMultiple"
              >
                <circle cx="7" cy="5" r="3" />
                <path
                  d="M10 12H5.898a3 3 0 0 0-2.976 2.628l-.641 5.124A2 2 0 0 0 4.266 22H9"
                />
                <path
                  d="M21.719 19.752l-.64-5.124A3 3 0 0 0 18.101 12h-2.204a3 3 0 0 0-2.976 2.628l-.641 5.124A2 2 0 0 0 14.266 22h5.468a2 2 0 0 0 1.985-2.248z"
                />
                <circle cx="17" cy="5" r="3" />
              </svg>
            </div>
            <p>Clubs</p>
          </router-link>
        </div>
        <div class="mb-1">
          <router-link
            :to="{ name: 'books' }"
            :class="
              $route.name === 'books'
                ? ['bg-b-secondary', 'text-t-primary']
                : [
                    'hover:text-t-primary',
                    'hover:bg-b-secondary-op',
                    'text-t-tertiary',
                  ]
            "
            class="w-full p-2 rounded text-left font-medium flex items-center"
          >
            <div class="w-8 h-8 flex justify-center items-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ai ai-Book"
              >
                <path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
                <path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
              </svg>
            </div>
            <p>Books</p>
          </router-link>
        </div>
        <div class="mb-1">
          <router-link
            :to="{ name: 'my-clubs' }"
            :class="
              $route.name === 'my-clubs'
                ? ['bg-b-secondary', 'text-t-primary']
                : [
                    'hover:text-t-primary',
                    'hover:bg-b-secondary-op',
                    'text-t-tertiary',
                  ]
            "
            class="w-full p-2 rounded text-left font-medium flex items-center"
          >
            <div class="w-8 h-8 flex justify-center items-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ai ai-Book"
              >
                <path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
                <path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
              </svg>
            </div>
            <p>My Clubs</p>
          </router-link>
        </div>
        <div class="mb-1">
          <router-link
            :to="{ name: 'my-books' }"
            :class="
              $route.name === 'my-books'
                ? ['bg-b-secondary', 'text-t-primary']
                : [
                    'hover:text-t-primary',
                    'hover:bg-b-secondary-op',
                    'text-t-tertiary',
                  ]
            "
            class="w-full p-2 rounded text-left font-medium flex items-center"
          >
            <div class="w-8 h-8 flex justify-center items-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ai ai-Book"
              >
                <path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
                <path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
              </svg>
            </div>
            <p>My Books</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useWindowSize from "../../../composables/useWindowSize";
import useClubs from "../../../composables/useClubs";
import Logo from "../ui/Logo.vue";
export default {
  components: {
    Logo,
  },
  setup() {
    const { height } = useWindowSize();
    const { currentClub } = useClubs();

    return {
      height,
      currentClub,
    };
  },
};
</script>

<style scoped>
.navbar {
  width: calc(100% - 5rem);
}
</style>
