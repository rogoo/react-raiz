import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // auto import of describe/it/expect
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: true, // if your files have css imports, this is needed to avoid errors
  },
});
