<template>
  <div class="absolute" id="alerts">
    <transition-group name="slide-right" mode="out-in" tag="span">
      <Alert
        :alertType="alert.alertType"
        :index="index"
        v-for="alert in alerts"
        :key="alert.id"
      >
        {{ alert.message }}
      </Alert>
    </transition-group>
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
