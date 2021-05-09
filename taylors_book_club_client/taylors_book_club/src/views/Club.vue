<template>
  <div class="w-full flex justify-center items-center">
    <div class="w-full flex justify-between items-start max-w-7xl">
      <div class="w-full mx-2">
        <div class="w-full rounded-xl flex justify-center items-center">
          <input
            type="text"
            class="bg-white h-10 focus:h-96 rounded-md px-4 w-full mr-2 shadow-sm"
            :placeholder="'Create a post'"
          />
          <button
            class="ml-2 bg-purple text-white px-8 font-medium h-8 rounded-md shadow-xl"
          >
            Post
          </button>
        </div>
        <div class="w-full h-screen">
          <div
            class="bg-white rounded-xl shadow-sm px-4 py-1 text-md leading-tight"
          >
            <p class="text-xs text-gray-600">@noahskorner</p>
            <h6 class="font-medium text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              aperiam reiciendis nihil, accusamus amet voluptatum!
            </h6>
            <p>
              Lorem ipsum dolor sit amet
              <span class="bg-black rounded-sm px-2 text-white">SPOILER</span>
              consectetur adipisicing elit. Incidunt, et? Ex, dolorem quas
              suscipit aut iusto vitae odio rerum unde...<a
                href="#"
                class="mx-1 hover:underline text-blue-600"
                >Read more</a
              >
            </p>
            <hr />
            <div class="flex justify-between items-center my-1">
              <div class="flex text-gray-600">
                <div class="text-sm flex justify-start items-center">
                  <i class="fas fa-arrow-up mr-1"></i> 256
                </div>
                <div class="text-sm flex justify-start items-center mx-2">
                  <i class="fas fa-comment mr-1"></i> 17
                </div>
              </div>

              <div class="flex">
                <IconButton>
                  <i class="fas fa-arrow-up text-red-400"></i>
                </IconButton>
                <IconButton>
                  <i class="fas fa-comment"></i>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/3 mx-2 hidden lg:block">
        <div class="w-full h-96 bg-white rounded-xl shadow-sm p-4 flex">
          <div>
            <img src="@/assets/img/pandpcover.jpeg" alt="" class="w-24" />
          </div>

          <div class="w-full ml-2 font-medium">Current Book</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "../components/ui/IconButton.vue";
export default {
  components: { IconButton },
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

<style scoped></style>
