import { onMounted, onUnmounted, toRefs, reactive } from "vue";

const state = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
});

const onResize = () => {
  state.width = window.innerWidth;
  state.height = window.innerHeight;
};

export default () => {
  onMounted(() => window.addEventListener("resize", onResize));
  onUnmounted(() => window.removeEventListener("resize", onResize));
  return {
    ...toRefs(state),
  };
};
