<template>
  <div class="min-h-screen" id="app">
    <!-- Theme -->
    <teleport to="head">
      <link rel="stylesheet" type="text/css" href="/themes/light-theme.css" />
    </teleport>
  </div>
</template>

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
</style>
