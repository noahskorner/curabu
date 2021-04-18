<template>
  <div class="absolute" id="alerts">
    <span v-for="(alert, index) in alerts" :key="index">
      <Alert
        v-if="!alert.dismissed"
        :alertType="alert.alertType"
        :index="index"
      >
        {{ alert.message }}
      </Alert>
    </span>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Alert from "../ui/Alert.vue";
export default {
  components: {
    Alert,
  },
  setup() {
    const store = useStore();

    return {
      alerts: computed(() => store.state.alert.alerts),
    };
  },
};
</script>

<style scoped>
#alerts {
  bottom: 3rem;
  right: 1rem;
}
</style>
