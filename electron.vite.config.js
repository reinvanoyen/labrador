// electron.vite.config.js
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

export default {
  main: {},
  preload: {
    plugins: [commonjs()],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          format: 'cjs', // commonjs format
        },
      },
      commonjsOptions: { transformMixedEsModules: true }
    }
  },
  renderer: {
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