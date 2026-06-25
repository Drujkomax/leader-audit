import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router") || id.includes("react-dom") || /\/react\//.test(id)) return "react-vendor";
            if (id.includes("@radix-ui")) return "radix-vendor";
            if (id.includes("framer-motion")) return "motion-vendor";
            if (id.includes("lucide-react")) return "icons-vendor";
            if (id.includes("@tanstack")) return "query-vendor";
          }
        },
      },
    },
  },
});
