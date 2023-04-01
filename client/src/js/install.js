const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// before the install prompt or button is clicked it, assigns event to window.deferredPrompt
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
// add events to listener to butInstall
butInstall.addEventListener("click", async () => {
  // newPrompt is set to window.deferredPrompt
  const newPrompt = window.deferredPrompt;
  //  if null it returns
  if (!newPrompt) {
    console.log("already installed");
    return;
  }
  // sets off prompt
  newPrompt.prompt();
  // sets prompt to null
  window.deferredPrompt = null;
  // hides button
  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
// if app is already installed, set to null
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
