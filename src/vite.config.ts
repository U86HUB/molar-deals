import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: 'localhost', // Restrict to localhost only for security
    port: 8080,
    fs: { strict: true }, // Enforce fs.deny rules
    hmr: {
      // Fix for __WS_TOKEN__ undefined error
      clientPort: mode === 'production' ? 443 : undefined, // Use HTTPS port for websockets when deployed
      host: 'localhost', // Match the host setting
      overlay: false, // Disable the error overlay - we'll handle errors ourselves
    },
    watch: {
      usePolling: false, // Disable polling for better performance
    },
  },
  plugins: [
    react({
      // Only pass valid SWC options
      jsxImportSource: "react",
      devTarget: "es2020",
      tsDecorators: true,
    }),
    mode === 'development' && componentTagger(),
    // Add visualizer plugin for bundle analysis
    mode === 'production' && 
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add test configuration for Vitest
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/setup.ts'],
    },
  },
  // Improve build options
  build: {
    target: 'es2020',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            '@tanstack/react-query',
          ],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-toast',
            // Other UI components
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit
  }
}));
