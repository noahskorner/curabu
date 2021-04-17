<template>
  <router-link
    id="card-wrapper"
    to="/clubs"
    class="w-full h-full flex justify-center items-center"
  >
    <div class="h-80 w-full rounded-xl overflow-hidden hover:shadow-xl">
      <div id="img-bg" class="h-2/5 w-full rounded-t-xl"></div>
      <div class="h-3/5 w-full rounded-b-xl relative" id="club-card-content">
        <img
          src="~@/assets/img/pandpcover.jpeg"
          class="absolute w-24 inline"
          alt=""
        />
        <div
          id="card-btns"
          class="absolute flex justify-between items-center pr-2"
        >
          <span>
            <button
              class="text-red-500 bg-light-gray rounded-full w-10 h-10 flex justify-center items-center shadow-2xl"
            >
              <i class="fas fa-heart fa-lg"></i>
            </button>
          </span>
          <span>
            <button
              class="text-blue-500 bg-light-gray rounded-full w-10 h-10 flex justify-center items-center shadow-2xl"
            >
              <i class="fas fa-plus fa-lg"></i>
            </button>
          </span>
          <span>
            <button
              class="text-gray bg-light-gray rounded-full w-10 h-10 flex justify-center items-center shadow-2xl text-dark"
            >
              <i class="fas fa-ellipsis-h fa-lg"></i>
            </button>
          </span>
        </div>

        <div class="pl-4">
          <h2 class="pt-12 text-xl font-medium">Club Name</h2>
          <h6>Pride and Prejudice</h6>
          <p class="text-sm font-light mt-2">Author: Jane Austen</p>
          <p class="text-sm font-light">Number of members: 10</p>
          <p class="text-sm font-light">Active members: 6</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {};
</script>

<style scoped>
#img-bg {
  background-image: url("~@/assets/img/pandpcover.jpeg");
  background-position: center;
  filter: blur(10px); /* apply the blur */
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
}

img {
  bottom: 80%;
  left: 5%;
}

#card-btns {
  width: 55%;
  top: -1.25rem;
  left: 45%;
}
</style>
