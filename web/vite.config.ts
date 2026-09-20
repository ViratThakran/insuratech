import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    // Alloy/Modal serves the dev server through a generated preview hostname,
    // so the default host check has to be relaxed for the sandbox.
    allowedHosts: true,
  },
});
