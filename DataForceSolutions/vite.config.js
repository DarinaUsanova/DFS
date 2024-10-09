import { build } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { defineConfig } from "vite";

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        legal: resolve(__dirname, "legal.html"),
      },
    },
  },
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 85,
      },
    }),
  ],
};
