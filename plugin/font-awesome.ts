import { library, config } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// This is important, we are going to let Nuxt.js worry about the CSS
// config.autoAddCss = false;

library.add(fas);

// Register the component globally
export default defineNuxtPlugin((nuxtApp) => {
  console.log("Registering FontAwesome");
  nuxtApp.vueApp.component("FaIcon", FontAwesomeIcon as any);
});
