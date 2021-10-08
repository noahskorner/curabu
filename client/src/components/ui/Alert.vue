<template>
  <div
    class="min-h-16 w-screen max-w-xl sm:w-96 shadow-2xl rounded-xl flex justify-start items-stretch px-3 my-2"
    id="alert"
  >
    <div class="bg-red-500 w-4" :class="getAlertColor()"></div>
    <div class="w-full flex justify-start items-center p-2 text-sm">
      <slot>This is an alert!</slot>
    </div>
    <button
      id="close-btn"
      class="py-2 flex flex-col justify-start items-center"
      @click="dismissAlert()"
    >
      <i class="fas fa-times fa-lg"></i>
    </button>
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  props: {
    alertType: {
      type: String,
      required: true,
      default: "notification",
    },
    index: {
      index: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const getAlertColor = () => {
      switch (props.alertType) {
        case "success":
          return "bg-green-500";
        case "warning":
          return "bg-yellow-500";
        case "error":
          return "bg-red-500;";
        case "notification":
          return "bg-blue-500";
        default:
          return "bg-blue-500";
      }
    };
    setTimeout(() => {
      store.dispatch("alert/dismissAlert", props.index);
    }, 10000);
    return {
      getAlertColor,
      dismissAlert: () => store.dispatch("alert/dismissAlert", props.index),
    };
  },
};
</script>

<style scoped></style>
