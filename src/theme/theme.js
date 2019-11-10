function isLightTheme(theme) {
  return theme.palette.type === 'light';
}

function isDarkTheme(theme) {
  return theme.palette.type === 'dark';
}

export { isLightTheme, isDarkTheme };
