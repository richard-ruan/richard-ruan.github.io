// Round light/dark switch in the bottom-right corner.
// The initial theme is applied by an inline script in index.html's <head>
// (before first paint); this file only builds the button and handles clicks.
(function () {
  var root = document.documentElement;
  var STORAGE_KEY = "site-theme";

  var SUN =
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  var MOON =
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function isLight() {
    return root.getAttribute("data-theme") === "light";
  }

  function label(button) {
    var next = isLight() ? "dark" : "light";
    button.setAttribute("aria-label", "Switch to " + next + " mode");
    button.title = "Switch to " + next + " mode";
  }

  function toggle(button) {
    var next = isLight() ? "dark" : "light";
    root.classList.add("theme-switching");
    root.setAttribute("data-theme", next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    label(button);
    setTimeout(function () { root.classList.remove("theme-switching"); }, 350);
  }

  function init() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.innerHTML = SUN + MOON;
    label(button);
    button.addEventListener("click", function () { toggle(button); });
    document.body.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
