module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "BFF",
    themeColor: "#4c2fe3",
    msTileColor: "#4c2fe3",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#4c2fe3",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/service-worker.js",
      // ...other Workbox options...
    },
  },
};
