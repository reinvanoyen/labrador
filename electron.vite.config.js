// electron.vite.config.js
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

export default {
  main: {},
  renderer: {
    plugins: [react(), commonjs()],
    define: {
      global: {},
    },
    optimizeDeps: {
      exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
    },
    build: {
      commonjsOptions: { transformMixedEsModules: true }
    }
  }
};