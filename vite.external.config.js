import { defineConfig } from "vite";
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/external/main.js'),
      formats: ['es'],
      fileName: 'module'
    },
    outDir: "external",
  },
  publicDir: false
});
