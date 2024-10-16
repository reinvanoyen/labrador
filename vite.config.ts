import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
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
});


/*
* import commonjs from "vite-plugin-commonjs";

export default {
	plugins: [commonjs()],
	define: {
		global: {},
	},
	build: {
		commonjsOptions: { transformMixedEsModules: true } // Change
	}
};
* */