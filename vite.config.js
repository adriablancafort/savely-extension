import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      svelte({
        compilerOptions: {
          css: mode === 'development' ? 'injected' : undefined,
        },
      }),
    ],
    server: {
      cors: true,
    },
    resolve: {
      alias: {
        '$lib': path.resolve(__dirname, 'src/lib'),
      },
    },
    build: {
      outDir: "package",
      rollupOptions: {
        input: "src/main.js",
        output: {
          entryFileNames: "script.js",
          assetFileNames: "styles.css",
        },
      },
      cssCodeSplit: false,
    },
  };
});