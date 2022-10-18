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
  modules: ["bootstrap-vue-3/nuxt"],
  css: [
    "bootstrap/dist/css/bootstrap.css",
    "@/assets/styles/fonts.css",
    "@/assets/styles/behavior.css",
  ],
});
