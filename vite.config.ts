import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("src/", import.meta.url)),
      },
      {
        find: "@comp",
        replacement: fileURLToPath(new URL("src/components/", import.meta.url)),
      },
      {
        find: "@layouts",
        replacement: fileURLToPath(new URL("src/layouts/", import.meta.url)),
      },
      {
        find: "@pages",
        replacement: fileURLToPath(new URL("src/pages/", import.meta.url)),
      },
    ],
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        // secure: false,
      },
    },
  },
});
