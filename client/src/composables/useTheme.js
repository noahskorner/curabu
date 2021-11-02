const themes = {
  light: "light",
  dark: "dark",
};

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
};

const loadTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme);
  } else {
    setTheme(themes.light);
  }
};

export { setTheme, loadTheme };
