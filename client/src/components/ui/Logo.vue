<template>
  <router-link to="/">
    <div id="logo" class="bg-dark-purple inline-block hover:shadow-2xl">
      <div class="w-full h-full flex justify-center items-center relative">
        <i class="fas fa-book-open fa-2x text-light-purple pt-1"></i>
        <i class="fas fa-book-open fa-lg text-white pt-1 absolute"></i>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
#logo {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
</style>
