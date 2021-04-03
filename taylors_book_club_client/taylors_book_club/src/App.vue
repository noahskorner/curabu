<template>
  <div class="min-h-screen font-primary">
    <!-- Theme -->
    <teleport to="head">
      <link rel="stylesheet" type="text/css" href="/themes/light-theme.css" />
    </teleport>
    <Header />
  </div>
</template>

<script>
import Header from "./components/layout/Header";
export default {
  components: {
    Header,
  },
  setup() {},
};
</script>

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
