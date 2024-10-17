// electron.vite.config.js
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

export default {
  main: {},
  renderer: {
    entry: 'src/renderer/init.tsx',
    plugins: [react(), commonjs()],
    define: {
      global: {},
    },
    optimizeDeps: {
      exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
    },
    build: {
      rollupOptions: {
        treeshake: false
      },
      minify: false,
      commonjsOptions: { transformMixedEsModules: true }
    }
  }
};