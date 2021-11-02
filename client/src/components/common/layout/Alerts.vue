<template>
  <div class="fixed bottom-0 right-0 z-50 p-4">
    <button
      class="w-96 alert p-2 bg-b-primary shadow-md rounded flex justify-between items-stretch border-bd-primary border text-left"
    >
      <div class="flex items-center">
        <div class="h-full w-1 bg-green-500 rounded"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke-width="2"
          class="ai ai-CircleCheckFill text-green-500 mx-2"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6z"
          />
        </svg>
      </div>
      <div class="text-sm flex-grow flex flex-col justify-center py-2">
        <h6 class="font-medium text-t-primary">Uh oh, something went wrong</h6>
        <p class="text-t-secondary">
          Sorry! There was a problem with your request
        </p>
      </div>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.alert:active {
  margin: -3px;
}
</style>
