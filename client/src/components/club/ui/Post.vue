<template>
  <div class="my-2">
    <div class="flex justify-start p-2 border border-bd-primary rounded">
      <div class="w-10 h-10 rounded-full mr-4 flex-shrink-0"></div>
      <div class="text-sm">
        <div class="flex items-center">
          <router-link :to="{ name: 'club' }" class="hover:underline">
            <h5 class="font-semibold">@noah-got-hacked</h5>
          </router-link>
          <p class="pl-1 text-xs text-t-tertiary font-light">
            {{ timeSince(dateCreated) }}
          </p>
        </div>
        <p class="font-medium">
          {{ title }}
        </p>
        <p class="text-t-secondary">
          {{ body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import timeSince from "../../../utils/timeSince";
export default {
  props: {
    postId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: String,
      required: true,
    },
  },
  setup() {
    return { timeSince };
  },
};
</script>

<style></style>
