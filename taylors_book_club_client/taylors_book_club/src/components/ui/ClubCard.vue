<template>
  <router-link
    id="card-wrapper"
    :to="{ name: 'club', params: { name: nameUrl } }"
    class="w-full h-full flex justify-center items-center"
  >
    <div class="h-80 w-full rounded-xl overflow-hidden hover:shadow-2xl">
      <div
        id="img-bg"
        class="h-2/5 w-full rounded-t-xl"
        :style="{ backgroundImage: `url(${book.image_url})` }"
      ></div>
      <div class="h-3/5 w-full rounded-b-xl relative" id="club-card-content">
        <div id="img-wrapper" class="absolute">
          <img :src="book.image_url" class="object-fill w-24 h-36" alt="" />
        </div>

        <div
          id="card-btns"
          class="absolute flex justify-between items-center pr-2"
        >
          <span>
            <button
              @click.prevent
              class="text-red-500 bg-light-gray hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center shadow-2xl"
            >
              <i class="fas fa-heart fa-lg"></i>
            </button>
          </span>
          <span>
            <button
              @click.prevent
              class="text-blue-500 bg-light-gray hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center shadow-2xl"
            >
              <i class="fas fa-plus fa-lg"></i>
            </button>
          </span>
          <span>
            <button
              class="text-gray bg-light-gray hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center shadow-2xl text-dark"
            >
              <i class="fas fa-ellipsis-h fa-lg"></i>
            </button>
          </span>
        </div>

        <div class="pl-4">
          <h2 class="pt-12 text-xl font-medium">{{ name }}</h2>
          <h6>{{ book.name }}</h6>
          <p class="text-sm font-light mt-2">Author: {{ book.author }}</p>
          <p class="text-sm font-light">Number of members: 10</p>
          <p class="text-sm font-light">Active members: 6</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: "Default Club Name",
    },
    nameUrl: {
      type: String,
      required: true,
    },
    currentBook: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      book: props.currentBook.book,
    };
  },
};
</script>

<style scoped>
#img-bg {
  background-position: center;
  background-size: 100% auto;
  filter: blur(10px); /* apply the blur */
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
}

#img-wrapper {
  bottom: 80%;
  left: 5%;
}

#card-btns {
  width: 55%;
  top: -1.25rem;
  left: 45%;
}

#card-btns button:hover {
  background-color: var(--gray-20);
}

#card-btns button:active {
  background-color: var(--gray-25);
}
</style>
