import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "external",
    rollupOptions: {
      input: "src/lib/external/main.js",
      output: {
        entryFileNames: "module.js"
      }
    }
  },
  publicDir: false
});
