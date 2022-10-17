export default defineNuxtPlugin((app) => {
  app.vueApp.config.errorHandler = (error, ctx) => {
    console.log(error, ctx);
  };
});
