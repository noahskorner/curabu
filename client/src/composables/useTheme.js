import { reactive, toRefs } from "vue";

const themes = ["red", "yellow", "green", "blue", "indigo", "purple", "pink"];

const state = reactive({
  darkMode: false,
  theme: "green",
});

const setDarkMode = (darkMode) => {
  state.darkMode = darkMode;
  localStorage.setItem("darkMode", darkMode);
  document.documentElement.setAttribute("data-dark", darkMode);
};

const setTheme = (theme) => {
  state.theme = themes[theme];
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
};

const loadTheme = () => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode) {
    setDarkMode(JSON.parse(darkMode));
  }

  const theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme);
  }
};

export default () => {
  return { themes, ...toRefs(state), setDarkMode, setTheme, loadTheme };
};
