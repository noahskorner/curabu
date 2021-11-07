import { ref, computed } from "vue";
import useWindowSize from "./useWindowSize";

const showSidebar = ref(false);

const displaySidebar = () => {
  showSidebar.value = true;
};

const hideSidebar = () => {
  showSidebar.value = false;
};

export default () => {
  const { width } = useWindowSize();
  return {
    showSidebar: computed(() => {
      return showSidebar.value || width.value >= 1024;
    }),
    displaySidebar,
    hideSidebar,
  };
};
