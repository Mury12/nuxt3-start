// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "/api",
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  plugins: [
    { src: "@/plugin/font-awesome.ts", mode: "client" },
    { src: "@/plugin/vue-the-mask.ts", mode: "client" },
    { src: "@/util/ApiClient.ts", mode: "client" },
  ],
  modules: ["bootstrap-vue-3/nuxt"],
  css: [
    "bootstrap/dist/css/bootstrap.css",
    "@/assets/styles/fonts.css",
    "@/assets/styles/behavior.css",
  ],
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
    ],
  },
});
