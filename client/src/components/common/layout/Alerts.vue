<template>
  <transition-group
    tag="div"
    class="fixed bottom-0 right-0 z-50 p-4"
    name="slide-right"
    appear
  >
    <button
      v-for="alert in alerts"
      @click="removeAlert(alert.id)"
      :key="alert.id"
      class="w-96 mt-1 p-2 bg-b-primary shadow-md rounded flex justify-between items-stretch border-bd-primary border text-left"
    >
      <div class="flex items-center">
        <div
          class="h-full w-1 rounded"
          :class="alertBarClass(alert.type)"
        ></div>
        <!-- Success Icon -->
        <svg
          v-if="alert.type === alertTypes.success"
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
        <!-- Error Icon -->
        <svg
          v-else-if="alert.type === alertTypes.error"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke-width="2"
          class="ai ai-CircleXFill text-red-500 mx-2"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm3.707 8.707a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293a1 1 0 1 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293z"
          />
        </svg>
        <!-- Warning Icon -->
        <svg
          v-else-if="alert.type === alertTypes.warning"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke-width="2"
          class="ai ai-CircleAlertFill text-yellow-500 mx-2"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm1 6a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V7zm0 9.5a1 1 0 1 0-2 0v.5a1 1 0 1 0 2 0v-.5z"
          />
        </svg>
        <!-- Info Icon -->
        <svg
          v-else-if="alert.type === alertTypes.info"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke-width="2"
          class="ai ai-InfoFill text-blue-500 mx-2"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm-.5 5a1 1 0 1 0 0 2h.5a1 1 0 1 0 0-2h-.5zM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2z"
          />
        </svg>
      </div>
      <div class="text-sm flex-grow flex flex-col justify-center py-2">
        <h6 class="font-medium text-t-primary">{{ alert.title }}</h6>
        <p class="text-t-secondary">
          {{ alert.message }}
        </p>
      </div>
    </button>
  </transition-group>
</template>

<script>
import { alertTypes } from "../../../common/constants";
import useAlerts from "../../../composables/useAlerts";
export default {
  setup() {
    const { alerts, addAlert, removeAlert } = useAlerts();

    const alertBarClass = (alertType) => {
      switch (alertType) {
        case alertTypes.success:
          return ["bg-green-500"];
        case alertTypes.error:
          return ["bg-red-500"];
        case alertTypes.warning:
          return ["bg-yellow-500"];
        case alertTypes.info:
          return ["bg-blue-500"];
      }
    };

    addAlert({
      title: "Uh oh, something went wrong",
      message: "Sorry! There was a problem with your request",
      type: alertTypes.error,
    });

    setTimeout(
      () =>
        addAlert({
          title: "Uh oh, something went wrong",
          message: "Sorry! There was a problem with your request",
          type: alertTypes.warning,
        }),
      1500
    );

    setTimeout(
      () =>
        addAlert({
          title: "Uh oh, something went wrong",
          message: "Sorry! There was a problem with your request",
          type: alertTypes.success,
        }),
      3000
    );

    setTimeout(
      () =>
        addAlert({
          title: "Uh oh, something went wrong",
          message: "Sorry! There was a problem with your request",
          type: alertTypes.info,
        }),
      4500
    );

    return {
      alertTypes,
      alerts,
      alertBarClass,
      removeAlert,
    };
  },
};
</script>

<style scoped></style>
