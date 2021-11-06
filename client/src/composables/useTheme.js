import { reactive, toRefs } from "vue";

const themes = {
  light: "light",
  dark: "dark",
};

const state = reactive({
  theme: themes.light,
});

const setTheme = (theme) => {
  state.theme = theme;
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
};

const toggleTheme = () => {
  if (localStorage.getItem("theme") === themes.light) {
    setTheme(themes.dark);
  } else {
    setTheme(themes.light);
  }
};

const loadTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme);
  } else {
    setTheme(themes.light);
  }
};

export default () => {
  return { themes, ...toRefs(state), setTheme, loadTheme, toggleTheme };
};
