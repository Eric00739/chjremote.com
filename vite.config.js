import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about/index.html",
        products: "products/index.html",
        blog: "blog/index.html",
        contact: "contact/index.html"
      }
    }
  }
});
