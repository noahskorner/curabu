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
import { computed, onMounted, reactive } from "vue";
import Alert from "../ui/Alert.vue";
export default {
  components: {
    Alert,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      windowHeight: window.innerHeight,
    });

    onMounted(() => {
      window.addEventListener("resize", () => {
        state.windowHeight = window.innerHeight;
      });
    });

    return {
      alerts: computed(() => store.state.alert.alerts),
      windowHeight: state.windowHeight,
    };
  },
};
</script>

<style scoped>
#alerts {
  right: 0;
  bottom: 0;
}
</style>
