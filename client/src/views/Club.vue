<template>
  <div class="w-full flex justify-center items-center">
    <div
      class="
        w-full
        h-screen
        flex
        justify-between
        items-start
        max-w-7xl
        px-10
        relative
      "
    >
      <div class="w-2/3 h-screen bg-blue-500 mx-2">
        <!-- Create post -->
        <div
          class="
            w-full
            shadow
            bg-white
            rounded
            h-14
            flex
            justify-between
            items-center
            px-2
          "
        >
          <Logo />
          <input
            placeholder="Create post"
            class="
              bg-gray-50
              border-1 border-gray-200
              h-10
              rounded
              w-full
              mx-2
              px-2
            "
          />
          <button class="bg-purple text-white px-4 text-lg py-1 rounded shadow">
            Send
          </button>
        </div>
        <div
          class="
            w-full
            shadow
            bg-white
            rounded
            h-16
            flex
            justify-between
            items-center
            px-2
            my-2
          "
        ></div>
      </div>
      <div class="w-1/3 h-screen bg-red-500 mx-2 absolute right-0"></div>
    </div>
  </div>
</template>

<script>
import Logo from "../components/ui/Logo.vue";
export default {
  components: {
    Logo,
  },
  props: {
    clubId: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  setup(props) {
    console.log(props);
  },
};
</script>

<style scoped>
</style>
