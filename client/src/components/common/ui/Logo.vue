<template>
  <div
    :class="size"
    class="rounded-full bg-primary flex justify-center items-center text-white relative font-logo"
  >
    <span
      :class="outerRingSize"
      class="font-bold relative flex justify-center items-center"
      >C
      <span :class="innerRingSize" class="absolute text-secondary font-bold"
        >C</span
      >
    </span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Array,
      required: false,
      default: () => ["w-28", "h-28"],
    },
    outerRingSize: {
      type: Array,
      required: false,
      default: () => ["text-7xl"],
    },
    innerRingSize: {
      type: Array,
      required: false,
      default: () => ["text-6xl"],
    },
  },
};
</script>

<style>
.font-logo {
  font-family: "Urbanist", sans-serif;
}
</style>
