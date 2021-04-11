<template>
  <div class="w-screen h-screen flex">
    <div class="w-2/3 bg-white h-full">
      <div id="login-header" class="px-4 flex items-center">
        <Logo />
      </div>
      <div class="w-full mt-16 flex justify-center items-center">
        <h1 class="font-semibold text-4xl text-dark-purple">Sign in to Taylor's Book Club</h1>
      </div>
    </div>
    <div class="w-1/3 h-full bg-dark-purple"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#login-header {
  height: 4rem;
}
</style>
