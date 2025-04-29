
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// Define package scripts
const packageJsonScripts = {
  "dev": "vite",
  "build": "vite build",
  "build:dev": "vite build --mode development",
  "lint": "eslint . --ext .ts,.tsx",
  "lint:fix": "eslint . --ext .ts,.tsx --fix",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write .",
  "preview": "vite preview",
  "test:unit": "vitest run",
  "test:unit:watch": "vitest",
  "test:unit:coverage": "vitest run --coverage",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test": "npm run test:unit && npm run test:e2e",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
};

// Add scripts to package.json if they don't exist
try {
  const fs = require('fs');
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  let updated = false;
  
  // Add scripts if they don't exist
  Object.entries(packageJsonScripts).forEach(([key, value]) => {
    if (!packageJson.scripts[key]) {
      packageJson.scripts[key] = value;
      updated = true;
    }
  });
  
  // Add or update overrides for security
  if (!packageJson.overrides) {
    packageJson.overrides = {};
  }
  
  packageJson.overrides["vite"] = "^6.2.6";
  packageJson.overrides["esbuild"] = "^0.25.0";
  packageJson.overrides["@babel/runtime"] = "7.26.10";
  packageJson.overrides["@babel/helpers"] = "7.26.10";
  updated = true;
  
  if (updated) {
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
    console.log('Updated package.json with scripts and security overrides');
  }
} catch (error) {
  console.error('Failed to update package.json:', error);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: 'localhost', // Restrict to localhost only for security
    port: 8080,
    fs: { strict: true }, // Enforce fs.deny rules
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
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
  }
}));
