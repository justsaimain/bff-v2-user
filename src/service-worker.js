import { Workbox } from "workbox-window";

self.__precacheManifest = [].concat(self.__precacheManifest || []);
Workbox.precaching.suppressWarnings();
Workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("message", (event) => {
  if (event.data.action == "SKIP_WAITING") self.skipWaiting();
});
