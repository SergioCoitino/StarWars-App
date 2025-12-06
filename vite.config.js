// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      // genera .br/.gz al build para el servidor que soporte servirlos
      viteCompression({ algorithm: "gzip", ext: ".gz" }),
      viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
    ],
    build: {
      target: "es2018", // entrega bundles compatibles con navegadores modernos; ajusta según compatibilidad necesaria
      cssTarget: "chrome61", // mejora tree shaking en CSS
      sourcemap: mode !== "production" ? true : false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // separar vendor para cache eficaz
              return "vendor";
            }
          },
        },
      },
      chunkSizeWarningLimit: 700,
    },
    // optimizaciones dev:
    server: {
      open: true,
      port: 5173,
    },
  };
});
