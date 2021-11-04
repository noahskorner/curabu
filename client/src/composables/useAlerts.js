import { reactive, toRefs } from "vue";

const state = reactive({
  totalAlerts: 0,
  alerts: [],
});

const addAlert = (alert) => {
  state.totalAlerts++;
  alert.id = state.totalAlerts;
  state.alerts.push(alert);

  setTimeout(() => {
    removeAlert(alert.id);
  }, 5000);
};

const removeAlert = (alertId) => {
  state.alerts.splice(
    state.alerts.findIndex((alert) => {
      return alert.id === alertId;
    }),
    1
  );
};

export default () => {
  return {
    ...toRefs(state),
    addAlert,
    removeAlert,
  };
};
