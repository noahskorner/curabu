<template>
  <router-view class="font-primary text-t-primary" />
</template>

<script></script>

<style>
html,
body {
  overflow-x: hidden;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
button:focus {
  outline: 0 !important;
}
input:focus {
  outline: 0 !important;
}
input[type="text"],
input[type="password"] {
  /* Remove First */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
