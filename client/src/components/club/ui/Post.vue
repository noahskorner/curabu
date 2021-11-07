<template>
  <div class="my-2">
    <div
      class="flex justify-start bg-b-primary p-2 border border-bd-primary rounded"
    >
      <div
        class="w-10 h-10 bg-b-secondary rounded-full mr-4 flex-shrink-0"
      ></div>
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
        <div class="flex justify-start items-center mt-1">
          <button class="flex mx-2 justify-start items-center">
            3<svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ai ai-ThumbsUp ml-1"
            >
              <path
                d="M11.605 5.782l.23-2.369c.091-.952.98-1.598 1.878-1.366 1.351.35 2.3 1.605 2.3 3.044v3.035c0 .675 0 1.013.146 1.26.083.141.197.26.333.345.24.151.567.151 1.22.151h.396c1.703 0 2.554 0 3.078.39.393.293.67.722.78 1.208.146.65-.181 1.463-.836 3.087l-.326.81a3.261 3.261 0 0 0-.226 1.48c.232 2.874-2.047 5.295-4.833 5.136l-10.424-.599c-1.139-.065-1.708-.098-2.222-.553-.515-.455-.612-.924-.805-1.861a14.324 14.324 0 0 1 .055-6.037c.283-1.248 1.475-1.92 2.706-1.76 3.264.42 6.223-2.019 6.55-5.4z"
              />
              <path d="M7 11.5l-.137.457A14.983 14.983 0 0 0 7 21" />
            </svg>
          </button>
          <button class="flex mx-2 justify-center items-center">
            3<svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ai ai-ChatBubble ml-1"
            >
              <path
                d="M14 19c3.771 0 5.657 0 6.828-1.172C22 16.657 22 14.771 22 11c0-3.771 0-5.657-1.172-6.828C19.657 3 17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172 2 5.343 2 7.229 2 11c0 3.771 0 5.657 1.172 6.828.653.654 1.528.943 2.828 1.07"
              />
              <path
                d="M14 19c-1.236 0-2.598.5-3.841 1.145-1.998 1.037-2.997 1.556-3.489 1.225-.492-.33-.399-1.355-.212-3.404L6.5 17.5"
              />
            </svg>
          </button>
        </div>
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
