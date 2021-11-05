import { ref, computed } from "vue";
import useWindowSize from "./useWindowSize";

const { width } = useWindowSize();

const showSidebar = ref(false);

const displaySidebar = () => {
  showSidebar.value = true;
};

const hideSidebar = () => {
  showSidebar.value = false;
};

export default () => {
  return {
    showSidebar: computed(() => {
      return showSidebar.value || width.value >= 1024;
    }),
    displaySidebar,
    hideSidebar,
  };
};
