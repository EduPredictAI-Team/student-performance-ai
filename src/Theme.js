export function applyTheme() {
  const savedTheme =
    localStorage.getItem("edupredictai-theme") || "dark";

  document.documentElement.classList.remove(
    "dark-mode",
    "light-mode"
  );

  document.body.classList.remove(
    "dark-mode",
    "light-mode"
  );

  document.documentElement.classList.add(
    savedTheme + "-mode"
  );

  document.body.classList.add(
    savedTheme + "-mode"
  );
}